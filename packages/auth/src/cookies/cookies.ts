import { NextResponse } from 'next/server';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

import { CookieOption, CookiesOptions } from './types';

export interface CookieOptions {
  path: string;
  domain: string;
  maxAge: number;
  sameSite: 'lax' | 'strict' | 'none';
  secure: boolean;
}

export type JWTString = string;

export type SetCookieOptions = Partial<CookieOption['options']> & {
  expires?: Date | string;
  encode?: (val: unknown) => string;
};
export type SessionToken<T extends 'jwt' | 'database' = 'jwt'> = T extends 'jwt'
  ? JWTString
  : string;

export const getSessionCookieOptions = () => {
  const cookies = defaultCookies(process.env.NODE_ENV === 'development');
  return cookies.sessionToken;
};

export const setSessionCookie = (
  res: NextResponse,
  jwt: string,
  expires: Date,
  domain: string,
) => {
  const cookies = defaultCookies(false);
  res.cookies.set({
    name: cookies.sessionToken.name,
    value: jwt,
    expires,
    domain: `.${domain}`,
    ...cookies.sessionToken.options,
  });
};

export const setSignInCookie = (res: NextResponse, jwt: string) => {
  const cookies = defaultCookies(process.env.NODE_ENV === 'development');
  res.cookies.set({
    name: cookies.signInToken.name,
    value: jwt,
    ...cookies.signInToken.options,
  });
};

export const setSignUpCookie = (res: NextResponse, jwt: string) => {
  const cookies = defaultCookies(process.env.NODE_ENV === 'development');
  res.cookies.set({
    name: cookies.signUpToken.name,
    value: jwt,
    ...cookies.signUpToken.options,
  });
};

export const getSignInCookie = (reqCookies: ReadonlyRequestCookies) => {
  const cookies = defaultCookies(process.env.NODE_ENV === 'development');
  return reqCookies.get(cookies.signInToken.name)?.value;
};

export const getSignUpCookie = (reqCookies: ReadonlyRequestCookies) => {
  const cookies = defaultCookies(process.env.NODE_ENV === 'development');
  return reqCookies.get(cookies.signUpToken.name)?.value;
};

export const getSessionCookie = (reqCookies: ReadonlyRequestCookies) => {
  const cookies = defaultCookies(process.env.NODE_ENV === 'development');
  return reqCookies.get(cookies.sessionToken.name)?.value;
};

export const deleteSignInCookie = (res: NextResponse) => {
  const cookies = defaultCookies(process.env.NODE_ENV === 'development');
  res.cookies.delete({
    name: cookies.signInToken.name,
    ...cookies.signInToken.options,
  });
};

export const deleteSignUpCookie = (res: NextResponse) => {
  const cookies = defaultCookies(process.env.NODE_ENV === 'development');
  res.cookies.delete({
    name: cookies.signUpToken.name,
    ...cookies.signUpToken.options,
  });
};

export const deleteSessionCookie = (res: NextResponse) => {
  const cookies = defaultCookies(process.env.NODE_ENV === 'development');
  res.cookies.delete({
    name: cookies.sessionToken.name,
    ...cookies.sessionToken.options,
  });
};

/**
 * Use secure cookies if the site uses HTTPS
 * This being conditional allows cookies to work non-HTTPS development URLs
 * Honour secure cookie option, which sets 'secure' and also adds '__Secure-'
 * prefix, but enable them by default if the site URL is HTTPS; but not for
 * non-HTTPS URLs like http://localhost which are used in development).
 * For more on prefixes see https://googlechrome.github.io/samples/cookie-prefixes/
 *
 * @TODO Review cookie settings (names, options)
 */
export function defaultCookies(useSecureCookies: boolean): CookiesOptions {
  const cookiePrefix = useSecureCookies ? '__Secure-' : '';
  return {
    // default cookie options
    sessionToken: {
      name: `__pxyz_session`,
      options: {
        httpOnly: true,
        sameSite: 'strict',
        path: '/',
        secure: useSecureCookies,
      },
    },
    signInToken: {
      name: `__pxyz_signin`,
      options: {
        httpOnly: true,
        sameSite: 'strict',
        path: '/',
        secure: useSecureCookies,
      },
    },
    signUpToken: {
      name: `__pxyz_signup`,
      options: {
        httpOnly: true,
        sameSite: 'strict',
        path: '/',
        secure: useSecureCookies,
      },
    },
    callbackUrl: {
      name: `${cookiePrefix}pxyz.callback-url`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: useSecureCookies,
      },
    },
    csrfToken: {
      // Default to __Host- for CSRF token for additional protection if using useSecureCookies
      // NB: The `__Host-` prefix is stricter than the `__Secure-` prefix.
      name: `${useSecureCookies ? '__Host-' : ''}pxyz.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: useSecureCookies,
      },
    },
    pkceCodeVerifier: {
      name: `${cookiePrefix}pxyz.pkce.code_verifier`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: useSecureCookies,
        maxAge: 60 * 15, // 15 minutes in seconds
      },
    },
    state: {
      name: `${cookiePrefix}pxyz.state`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: useSecureCookies,
        maxAge: 60 * 15, // 15 minutes in seconds
      },
    },
    nonce: {
      name: `${cookiePrefix}pxyz.nonce`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: useSecureCookies,
      },
    },
  };
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
    secure: domain === '.localhost' ? false : secure,
  } as CookieOptions;
}

export function getHostnameFromOrigin(origin: string) {
  const url = new URL(origin);

  return url.hostname;
}

export function getTLDFromHostname(hostname: string | undefined) {
  if (hostname === 'localhost' || hostname?.endsWith('localhost')) {
    return hostname?.split('.').slice(-1).join('') ?? '';
  } else {
    return hostname?.split('.').slice(-2).join('.') ?? '';
  }
}

export function getCookieDomain(origin: string | undefined, secure: boolean) {
  if (!origin || !secure) return '.localhost';
  const hostname = getHostnameFromOrigin(origin);
  const tld = getTLDFromHostname(hostname);

  return process.env.PROTOCOL_ENV === 'development' ? undefined : `.${tld}`;
}
