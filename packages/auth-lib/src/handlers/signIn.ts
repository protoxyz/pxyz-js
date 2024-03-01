import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { Session, User } from "@abhub/core";

import type {
  Auth,
  AuthActionState,
  AuthConfig,
  AuthProviderId,
  AuthUser,
} from "..";
import type { SignInWithCredentialsInput } from "../schemas";
import { signInWithCredentialsSchema } from "../schemas";

export type SignInResult = {
  error?: string;
  user?: AuthUser;
} & {
  error?: string;
  redirectUri?: string;
};

export async function signIn(
  auth: Auth,
  provider: string,
  input?: SignInWithCredentialsInput,
): Promise<AuthActionState> {
  switch (provider) {
    case "google":
      return await signInWithOAuth("google", auth);
    case "credentials":
      return await signInWithCredentials(auth.config, input!);
    default:
      return { status: "failed", message: "Invalid provider.", errors: {} };
  }
}

export async function signInWithOAuth(provider: string, auth: Auth) {
  const state = Math.random().toString(36).slice(-8);

  cookies().set({
    name: auth.config.cookies.state.name,
    value: state,
    ...auth.config.cookies.state.options,
  });

  const authorizeUrl = await auth.config.providers[
    provider as AuthProviderId
  ]?.getAuthorizationUrl?.(auth.config, state);

  if (!authorizeUrl) {
    return {
      status: "failed",
      errors: {},
      message: "Failed to create authorization URL.",
    } as AuthActionState;
  }

  redirect(authorizeUrl);
}

export async function signInWithCredentials(
  authConfig: AuthConfig,
  unsafeInput: SignInWithCredentialsInput,
) {
  const input = signInWithCredentialsSchema.safeParse(unsafeInput);

  if (!input.success) {
    return {
      status: "failed",
      message: "Invalid input.",
      errors: input.error.flatten().fieldErrors,
    } as AuthActionState;
  }

  const result = await User.authenticate(input.data);

  if (!result.ok) {
    return {
      status: "failed",
      message: result.message,
      errors: result.errors ?? {},
    } as AuthActionState;
  }

  if (result.user) {
    const sessionResult = await Session.create({
      userId: result.user.id,
      expires: new Date(Date.now() + authConfig.session.duration), // 30 days
    });

    if (sessionResult.status === "failed") {
      return sessionResult as AuthActionState;
    }

    if (!sessionResult?.session) {
      return {
        status: "failed",
        message: "Failed to create session",
        errors: {},
      } as AuthActionState;
    }

    const sessionToken = Session.createSessionJWT({
      session: sessionResult.session,
    });

    cookies().set({
      name: authConfig.cookies.session.name,
      value: sessionToken,
      ...authConfig.cookies.session.options,
    });

    await User.touchLastLoginAt(result.user.id);

    return {
      errors: {},
      status: "success",
      message: "",
      user: result.user,
    } as AuthActionState;
  } else {
    return {
      errors: {},
      status: "failed",
      message: "Error authenticating.",
    } as AuthActionState;
  }
}
