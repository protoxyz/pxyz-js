import { SessionUser } from '@protoxyz/types';
import { headers as nextHeaders } from 'next/headers';
import { verifyJWT } from './jwt';
import { getBearerToken, getCookieToken, getSecretKey } from './util';

export async function getAuth({
  token,
  secretKey,
}: {
  token?: string | null | undefined;
  secretKey?: string;
}): Promise<SessionUser | null> {
  const headers = nextHeaders();

  const authToken =
    token ||
    (await getCookieToken({ headers })) ||
    (await getBearerToken({ headers }));

  if (!authToken) return null;

  const key = getSecretKey({ secretKey });

  const decoded = await verifyJWT({ token: authToken, key });

  return decoded as SessionUser | null;
}
