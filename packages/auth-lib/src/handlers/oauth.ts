"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import type { SessionSchema } from "@abhub/db/schema";
import { Account, Session, User } from "@abhub/core";

import type { Auth, AuthProvider, AuthProviderId } from "../types";

export interface HandleOAuthCallbackProps {
  auth: Auth;
  state: string | null | undefined;
  code: string | null | undefined;
  scope: string | null | undefined;
  provider: string;
}
export async function handleOAuthCallback({
  auth,
  state,
  code,
  scope,
  provider,
}: HandleOAuthCallbackProps) {
  if (!state) {
    return new Response("Missing state in response.", { status: 400 });
  }

  const name = auth.config.cookies.state.name;
  const stateCookie = cookies().get(name)?.value;

  if (!stateCookie) {
    return new Response("Missing state cookie.", { status: 400 });
  }

  if (state !== stateCookie) {
    return new Response("Invalid state.", { status: 400 });
  }

  cookies().delete(auth.config.cookies.state.name);

  if (!code) {
    return new Response("Missing code in response.", { status: 400 });
  }

  const providerSettings = auth.config.providers[
    provider as AuthProviderId
  ] as AuthProvider | null;

  if (!providerSettings) {
    return new Response("Provider not configured.", { status: 400 });
  }

  const tokens = await providerSettings.getAccessToken?.(auth.config, code);

  if (!tokens) {
    return new Response("Unable to get tokens.", { status: 400 });
  }

  const oauthProfile = (await providerSettings.getProfile?.(
    auth.config,
    tokens.access_token,
  ))!;

  if (!oauthProfile) {
    return new Response("Unable to get profile.", { status: 400 });
  }

  if (tokens.error) {
    return new Response(tokens.error, { status: 400 });
  }

  const account = await Account.get({
    provider,
    providerAccountId: oauthProfile.profile.id,
  });

  if (!account) {
    const randomPassword = Math.random().toString(36).slice(-8);
    const existingUser = await User.getByEmail({
      email: oauthProfile.profile.email,
    });

    const user =
      existingUser ??
      (await User.create({
        email: oauthProfile.profile.email,
        emailVerified: oauthProfile.profile.email_verified
          ? new Date()
          : undefined,
        name: oauthProfile.profile.name ? oauthProfile.profile.name : null,
        image: oauthProfile.profile.image ? oauthProfile.profile.image : null,
        password: randomPassword,
        lastLoginAt: new Date(),
        lastSeenAt: new Date(),
      }));

    if (!user) {
      return new Response("Invalid user.", { status: 400 });
    }

    if ("errors" in user) {
      return new Response(JSON.stringify(user.errors), { status: 400 });
    }

    await Account.create({
      type: "oauth",
      provider,
      providerAccountId: oauthProfile.profile.id,
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token ?? "",
      id_token: tokens.id_token,
      expires_at: tokens.expires_in
        ? tokens.expires_in
        : new Date(Date.now()).getTime(),
      scope: scope ?? "",
      userId: user.id,
    });

    const sessionResult = await Session.create({
      userId: user.id,
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    });

    if (!sessionResult) {
      return new Response("Failed to create session", { status: 400 });
    }

    if (sessionResult.status === "failed") {
      return new Response(sessionResult.message, { status: 400 });
    }

    const sessionToken = Session.createSessionJWT({
      session: sessionResult.session as SessionSchema,
    });

    cookies().set({
      name: auth.config.cookies.session.name,
      value: sessionToken,
      ...auth.config.cookies.session.options,
    });

    await User.touchLastLoginAt(user.id);

    redirect(auth.config.afterSignUpRedirectUri);
  } else {
    const user = await User.get({ id: account.userId });

    if (!user) {
      return new Response("Invalid user.", { status: 400 });
    }

    if ("errors" in user) {
      return new Response(JSON.stringify(user.errors), { status: 400 });
    }

    // update user
    await User.update(user.id, {
      name: oauthProfile.profile.name,
      image: oauthProfile.profile.image ? oauthProfile.profile.image : null,
    });

    const sessionResult = await Session.create({
      userId: user.id,
      expires: new Date(Date.now() + auth.config.session.duration),
    });

    if (!sessionResult) {
      return new Response("Failed to create session", { status: 400 });
    }

    if (sessionResult.status === "failed") {
      return new Response(JSON.stringify(sessionResult.message), {
        status: 400,
      });
    }

    const sessionToken = Session.createSessionJWT({
      session: sessionResult.session as SessionSchema,
    });

    cookies().set({
      name: auth.config.cookies.session.name,
      value: sessionToken,
      ...auth.config.cookies.session.options,
    });

    await User.touchLastLoginAt(user.id);

    redirect(auth.config.afterSignInRedirectUri);
  }
}
