import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getCookieOptions, getSecretKey, verifyJWT } from '@protoxyz/auth';

export const GET = async (req: NextRequest) => {
  const url = req.nextUrl;
  const params = Object.fromEntries(url.searchParams.entries());
  const token = params.jwt;
  const redirectPath = params.redirectPath ?? '/';
  const key = getSecretKey({});
  const verified = token ? await verifyJWT({ token, key }) : null;

  if (verified) {
    const cookieOptions = getCookieOptions(
      url.hostname,
      process.env.NODE_ENV === 'production',
    );
    url.searchParams.delete('token');
    url.searchParams.delete('redirectPath');

    const response = NextResponse.redirect(new URL(redirectPath, url));
    response.cookies.set('__pxyz_session', token, {
      ...cookieOptions,
    });

    return response;
  }
};
