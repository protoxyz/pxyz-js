import { Tenant } from '@protoxyz/types';
import Cookies from 'js-cookie';

export const SESSION_COOKIE_NAME = '__pxyz_session';

export const getSessionCookieDomain = (tenant: Tenant) => {
  const tenantIsProduction = tenant.environment !== 'development';

  if (!tenantIsProduction) {
    return undefined;
  }

  const tld = getTLDFromHostname(window.location.hostname);

  return `.${tld}`;
};

export function getTLDFromHostname(hostname: string | undefined) {
  if (hostname === 'localhost' || hostname?.endsWith('localhost')) {
    return hostname?.split('.').slice(-1).join('') ?? '';
  } else {
    return hostname?.split('.').slice(-2).join('.') ?? '';
  }
}

export const getSessionCookieOptions = (
  tenant: Tenant,
): Cookies.CookieAttributes => {
  const tenantIsProduction = tenant.environment !== 'development';

  return {
    path: '/',
    sameSite: 'lax',
    secure: tenantIsProduction,
    domain: getSessionCookieDomain(tenant),
  };
};

export const setSessionCookie = (jwt: string, tenant: Tenant) => {
  let options: Cookies.CookieAttributes = getSessionCookieOptions(tenant);

  if (tenant.environment === 'development') {
    localStorage.setItem(SESSION_COOKIE_NAME, jwt);
  }

  if (tenant.auth?.sessionMaximumLifetimeEnabled) {
    const minutes = tenant?.auth?.sessionMaximumLifetime;
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + minutes);
    options.expires = expires;
  }

  if (tenant.auth?.sessionInactivityTimeoutEnabled) {
    const minutes = tenant?.auth?.sessionInactivityTimeout;
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + minutes);
    options.expires = expires;
  }

  console.log('setSessionCookie', options);

  Cookies.set(SESSION_COOKIE_NAME, jwt, options);
};

export const deleteSessionCookie = (tenant: Tenant) => {
  const options: Cookies.CookieAttributes = getSessionCookieOptions(tenant);

  Cookies.remove(SESSION_COOKIE_NAME, options);

  if (tenant.environment === 'development') {
    localStorage.removeItem(SESSION_COOKIE_NAME);
  }
};
