export const defaultPublicRoutes = ['/', '/sign-in', '/sign-up'];

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
