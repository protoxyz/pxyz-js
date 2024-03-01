import { cookies } from "next/headers";

import { Session, User } from "@abhub/core";

import type { AuthConfig, AuthResult } from "./types";

export interface AuthInput {
  role?: string;
}

export type AuthFunction = (input?: AuthInput) => Promise<AuthResult>;

export type AuthFunctionWithConfig = (
  { config }: { config: AuthConfig },
  input?: AuthInput,
) => Promise<AuthResult>;

export const auth: AuthFunctionWithConfig = async (
  { config }: { config: AuthConfig },
  input?: AuthInput,
): Promise<AuthResult> => {
  const cookie = cookies().get(config.cookies.session.name);

  if (!cookie) {
    return null;
  }

  const session = await Session.verify({ token: cookie.value });

  if (!session) {
    return null;
  }

  // If the session has expired, remove it from the database and return null.
  if (session.expires < new Date()) {
    await Session.remove({ sessionToken: session.sessionToken });
    return null;
  }

  // If the session is valid, return the user.
  const user = await User.get({ id: session.userId });
  await User.touchLastSeenAt(session.userId);

  if (!user) {
    return null;
  }

  if ("errors" in user) {
    return null;
  }

  if (input?.role && !user.roles?.includes(input?.role)) {
    return null;
  }

  return {
    user,
    expires: session.expires,
  };
};
