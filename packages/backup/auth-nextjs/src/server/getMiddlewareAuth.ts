import { NextRequest } from 'next/server';
import { getBearerToken, getCookieToken, getSecretKey } from './util';
import { verifyJWT } from './jwt';
import { SessionUser } from '@protoxyz/types';

export async function getMiddlewareToken({ headers }: { headers: Headers }) {
  return (
    (await getCookieToken({ headers })) || (await getBearerToken({ headers }))
  );
}

export async function getMiddlewareAuth({
  req,
  key,
}: {
  req: NextRequest;
  key?: string;
}) {
  const headers = req.headers;

  const token = await getMiddlewareToken({ headers });

  if (!token) return null;

  const secretKey = getSecretKey({ key });

  const decoded = await verifyJWT({ token, key: secretKey });

  return decoded as SessionUser;
}
