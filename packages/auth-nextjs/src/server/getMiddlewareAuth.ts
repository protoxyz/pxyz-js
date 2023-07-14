import { NextRequest } from 'next/server';
import { getBearerToken, getCookieToken, getPublicKey } from './util';
import { verifyJWT } from './jwt';
import { SessionUser } from '@protoxyz/types';

export async function getMiddlewareAuth({
  req,
  jwtKey,
}: {
  req: NextRequest;
  jwtKey?: string;
}) {
  const headers = req.headers;

  const token =
    (await getCookieToken({ headers })) || (await getBearerToken({ headers }));

  if (!token) return null;

  const publicKey = getPublicKey({ jwtKey });

  const decoded = await verifyJWT({ token, pem: publicKey });

  return decoded as SessionUser;
}
