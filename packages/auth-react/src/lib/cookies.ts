import { Tenant } from '@protoxyz/types';
import Cookies from 'js-cookie';

const SESSION_COOKIE_NAME = '__pxyz_session';

export const setSessionCookie = (jwt: string, tenant: Tenant) => {
  const expires = new Date();
  expires.setDate(expires.getDate() + 1);

  const tenantIsProduction = tenant.environment !== 'development';

  let options: Cookies.CookieAttributes = {
    expires,
    path: '/',
    sameSite: 'lax',
    secure: tenantIsProduction,
  };

  Cookies.set(SESSION_COOKIE_NAME, jwt, options);
};

export const deleteSessionCookie = (tenant: Tenant) => {
  const tenantIsProduction = tenant.environment !== 'development';

  let options: Cookies.CookieAttributes = {
    path: '/',
    sameSite: 'lax',
    secure: tenantIsProduction,
  };

  Cookies.remove(SESSION_COOKIE_NAME, options);
};
