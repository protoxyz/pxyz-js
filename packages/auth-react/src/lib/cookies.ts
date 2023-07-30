import { Tenant } from '@protoxyz/types';
import { get } from 'http';
import Cookies from 'js-cookie';

const SESSION_COOKIE_NAME = '__pxyz_session';

export const getSessionCookieDomain = (tenant: Tenant) => {
  const tenantIsProduction = tenant.environment !== 'development';

  if (!tenantIsProduction) {
    return '.localhost';
  }

  const hostname = window.location.hostname;
  const tld =
    hostname === 'localhost'
      ? 'localhost'
      : hostname.split('.').slice(-2).join('.');

  return `.${tld}`;
};

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

  if (tenant.auth?.sessionMaximumLifetimeEnabled) {
    const minutes = tenant.auth.sessionMaximumLifetime;
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + minutes);
    options.expires = expires;
  }

  if (tenant.auth?.sessionInactivityTimeoutEnabled) {
    const minutes = tenant.auth.sessionInactivityTimeout;
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + minutes);
    options.expires = expires;
  }

  Cookies.set(SESSION_COOKIE_NAME, jwt, options);
};

export const deleteSessionCookie = (tenant: Tenant) => {
  const options: Cookies.CookieAttributes = getSessionCookieOptions(tenant);

  Cookies.remove(SESSION_COOKIE_NAME, options);
};
