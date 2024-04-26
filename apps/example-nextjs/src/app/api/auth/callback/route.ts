import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { getCookieOptions, getSecretKey, verifyJWT } from "@protoxyz/auth";

export const GET = async (req: NextRequest) => {
  const url = req.nextUrl;
  const params = Object.fromEntries(url.searchParams.entries());
  const token = params.jwt;
  const redirectPath = params.redirectPath ?? "/";
  const key = getSecretKey({});
  const verified = token ? await verifyJWT({ token, key }) : null;

  if (verified) {
    // Session is verified, you could sync the user object to your database here and send a welcome email, or do something else

    try {
      const cookieOptions = getCookieOptions(
        `${url.protocol}//${url.hostname}`
      );

      url.searchParams.delete("token");
      url.searchParams.delete("redirectPath");

      const redirectUrl = new URL(redirectPath, url);
      const response = NextResponse.redirect(redirectUrl);

      response.cookies.set("__pxyz_session", token, {
        ...cookieOptions,
      });

      return response;
    } catch (err) {
      console.error("FAILED TO GET COOKIE OPTIONS");
      console.error(err);
    }
  } else {
    console.error("Failed to verify JWT token");
  }

  return NextResponse.redirect(new URL("/?error=true", url));
};
