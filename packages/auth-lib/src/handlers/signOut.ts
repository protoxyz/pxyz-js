import { cookies } from "next/headers";

import { Session } from "@abhub/core";

import type { Auth } from "..";

export async function signOut(auth: Auth) {
  const cookie = cookies().get(auth.config.cookies.session.name);

  if (!cookie) {
    return false;
  }

  await Session.signOut({ token: cookie.value });

  cookies().delete(auth.config.cookies.session.name);

  return true;
}
