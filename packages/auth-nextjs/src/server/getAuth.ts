import { SessionUser } from '@protoxyz/types';
import { headers as nextHeaders } from 'next/headers';
import { verifyJWT } from './jwt';
import { getBearerToken, getCookieToken, getSecretKey } from './util';

export async function getAuth({
  key,
}: {
  key?: string;
}): Promise<SessionUser | null> {
  const headers = nextHeaders();

  const token =
    (await getCookieToken({ headers })) || (await getBearerToken({ headers }));

  if (!token) return null;

  const secretKey = getSecretKey({ key });

  const decoded = await verifyJWT({ token, key: secretKey });

  return decoded as SessionUser;
}
