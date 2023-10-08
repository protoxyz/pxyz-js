import { headers as nextHeaders } from 'next/headers';
import { getBearerToken, getCookieToken } from './util';

export async function getToken(): Promise<string | null> {
  const headers = nextHeaders();

  const token =
    (await getCookieToken({ headers })) || (await getBearerToken({ headers }));

  if (!token) return null;

  return token;
}
