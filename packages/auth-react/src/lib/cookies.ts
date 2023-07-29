import { Tenant } from '@protoxyz/types';
import Cookies from 'js-cookie';

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

  Cookies.set('__pxyz_session', jwt, options);
};
