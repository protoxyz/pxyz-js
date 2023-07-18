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
  origin: string | undefined,
  secure: boolean = process.env.NODE_ENV === 'production',
) {
  if (!origin) return {} as CookieOptions;
  const domain = getCookieDomain(origin, secure);

  return {
    path: '/',
    domain,
    maxAge: 315360000,
    sameSite: 'lax',
    expires: new Date(Date.now() + 315360000),
    secure,
  } as CookieOptions;
}

export function getHostnameFromOrigin(origin: string) {
  const url = new URL(origin);

  return url.hostname;
}

export function getTLDFromHostname(hostname: string | undefined) {
  return hostname?.split('.').slice(-2).join('.') ?? '';
}

export function getCookieDomain(origin: string | undefined, secure: boolean) {
  if (!origin || !secure) return 'localhost';
  const hostname = getHostnameFromOrigin(origin);
  const tld = getTLDFromHostname(hostname);

  return process.env.PROTOCOL_ENV === 'development' ? undefined : `.${tld}`;
}
