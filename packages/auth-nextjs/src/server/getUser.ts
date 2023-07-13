import 'server-only';
import { headers as nextHeaders } from 'next/headers';
import { verifyJWT } from './jwt';
import { ResponseStatus, SessionUser, UserProfile } from '@protoxyz/types';
import { Protocol } from '@protoxyz/core';

export const parseCookieString = (
  cookie: string | null,
): Record<string, string> =>
  (cookie || '')
    .split(';')
    .map((v) => v.split('='))
    .reduce(
      (acc, [key, value]) => ({
        ...acc,
        ...(key && value ? { [key.trim()]: decodeURIComponent(value) } : {}),
      }),
      {},
    );

export async function getCookieToken({ headers }: { headers: Headers }) {
  const cookies = parseCookieString(headers.get('cookie'));
  if (!cookies || !cookies['__pxyz_session']) return null;
  const token = cookies['__pxyz_session'];
  if (!token) return null;

  return token;
}

export async function getBearerToken({ headers }: { headers: Headers }) {
  const authorization = headers.get('authorization');
  if (!authorization) return null;
  const token = authorization.replace(/^Bearer /, '');
  if (!token) return null;

  return token;
}

export function getPublicKey({ jwtKey }: { jwtKey?: string }) {
  const publicKey = (jwtKey ?? process.env.PXYZ_AUTH_JWT_KEY ?? '')
    .split(String.raw`\n`)
    .join('\n');

  if (!publicKey)
    throw new Error('Missing PXYZ_AUTH_JWT_KEY environment variable');

  return publicKey;
}

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

// export async function getSession({ jwtKey }: { jwtKey?: string }): Promise<SessionUser | null> {
//     const headers = nextHeaders();

//     const token = (await getCookieSession({ headers })) || (await getBearerToken({ headers }));

//     if (!token) return null;

//     const publicKey = getPublicKey({ jwtKey });

//     const decoded = await verifyJWT({ token, pem: publicKey });

//     const protocol = new Protocol({ accessToken: decoded.token });

//     const response = await protocol.auth.sessions.get();

//     return decoded as SessionUser;
// }

export async function getToken(): Promise<string | null> {
  const headers = nextHeaders();

  const token =
    (await getCookieToken({ headers })) || (await getBearerToken({ headers }));

  if (!token) return null;

  return token;
}

export async function getUser({
  domain,
  publicKey,
}: {
  domain: string;
  publicKey: string;
}): Promise<UserProfile | null> {
  const headers = nextHeaders();

  const token =
    (await getCookieToken({ headers })) || (await getBearerToken({ headers }));

  if (!token) return null;

  const protocol = new Protocol({ accessToken: token });

  const userResponse = await protocol.auth.users.profile({
    headers: {
      'x-protocol-hostname': domain,
      'x-protocol-instance-pkey': publicKey,
    },
  });

  if (userResponse.status === ResponseStatus.Error) {
    return null;
  }

  return userResponse?.data?.user ?? null;
}
