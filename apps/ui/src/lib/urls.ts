export const getAccountsUrl = ({ path = '/' }: { path?: string } = {}) => {
  const pxyzDomain = process.env.NEXT_PUBLIC_PXYZ_DOMAIN;

  if (!pxyzDomain) {
    throw new Error('Missing process.env.NEXT_PUBLIC_PXYZ_DOMAIN');
  }

  const protocol =
    process.env.NODE_ENV === 'development' ? 'http://' : 'https://';
  const url = new URL(path, protocol + pxyzDomain);

  return url;
};

export const getLoginUrl = (path: string | undefined = '/') => {
  const url = getAccountsUrl({ path: '/sign-in' });
  const redirectUri = new URL(
    '/api/auth/callback',
    process.env.NEXT_PUBLIC_AUTH_URL,
  );
  redirectUri.searchParams.set('redirectPath', path);

  url.searchParams.set('redirectUri', redirectUri.toString());

  return url.toString();
};

export const getSignupUrl = (path: string | undefined = '/onboard') => {
  const url = getAccountsUrl({ path: '/sign-up' });
  const redirectUri = new URL(
    '/api/auth/callback',
    process.env.NEXT_PUBLIC_AUTH_URL,
  );
  redirectUri.searchParams.set('redirectPath', path);

  url.searchParams.set('redirectUri', redirectUri.toString());

  return url.toString();
};
