import { SessionUser } from '@protoxyz/types';
import { headers as nextHeaders } from 'next/headers';
import { verifyJWT } from './jwt';
import { getBearerToken, getCookieToken, getSecretKey } from './util';

export async function getAuth({
  token,
  key,
}: {
  token?: string | null | undefined;
  key?: string;
}): Promise<SessionUser | null> {
  const headers = nextHeaders();

  const authToken =
    token ||
    (await getCookieToken({ headers })) ||
    (await getBearerToken({ headers }));

  if (!authToken) return null;

  const secretKey = getSecretKey({ key });

  const decoded = await verifyJWT({ token: authToken, key: secretKey });

  return decoded as SessionUser | null;
}
