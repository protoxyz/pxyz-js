import { SessionUser } from '@protoxyz/types';
import { headers as nextHeaders } from 'next/headers';
import { verifyJWT } from './jwt';
import { getBearerToken, getCookieToken, getPublicKey } from './util';

export async function getAuth({
  jwtKey,
}: {
  jwtKey?: string;
}): Promise<SessionUser | null> {
  const headers = nextHeaders();

  const token =
    (await getCookieToken({ headers })) || (await getBearerToken({ headers }));

  if (!token) return null;

  const publicKey = getPublicKey({ jwtKey });

  const decoded = await verifyJWT({ token, pem: publicKey });

  return decoded as SessionUser;
}
