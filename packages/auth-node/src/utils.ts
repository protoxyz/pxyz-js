import jwt from 'jsonwebtoken';

export function getDomainFromHostnameWithoutPort(hostname: string | undefined) {
  return hostname?.split(':')[0] ?? '';
}

export function decodeJWTTokenWithPublicPEMKey(
  token: string,
  publicKey: string,
) {
  return jwt.verify(token, publicKey, { algorithms: ['RS256'] }) as Record<
    string,
    any
  >;
}

export interface CookieOptions {
  path: string;
  domain: string;
  maxAge: number;
  sameSite: 'lax' | 'strict' | 'none';
  secure: boolean;
}
export function getCookieOptions(
  hostWithPort: string | undefined,
  secure: boolean = process.env.NODE_ENV === 'production',
) {
  if (!hostWithPort) return {} as CookieOptions;
  const domain = getCookieDomain(hostWithPort, secure);

  return {
    path: '/',
    domain,
    maxAge: 315360000,
    sameSite: 'lax',
    expires: new Date(Date.now() + 315360000),
    secure,
  } as CookieOptions;
}

export function getCookieDomain(
  hostWithPort: string | undefined,
  secure: boolean,
) {
  if (!hostWithPort || !secure) return 'localhost';
  const host = getDomainFromHostnameWithoutPort(hostWithPort);
  const split = host.split('.');
  const domain =
    process.env.PROTOCOL_ENV === 'development'
      ? undefined
      : `.${split.slice(-2).join('.')}`;

  return domain;
}
