import { SessionUser } from '@protoxyz/types';
import { headers as nextHeaders } from 'next/headers';
import { verifyJWT } from './jwt';
import { getBearerToken, getCookieToken, getSecretKey } from './util';
import { redirect } from 'next/navigation';
import { getLoginUrl } from './urls';  

export async function auth(props?: {
  token?: string | null | undefined;
  secretKey?: string;
})  {
  const headers = nextHeaders();

    const authToken =
      props?.token ||
      (await getCookieToken({ headers })) ||
      (await getBearerToken({ headers }));

    if (!authToken) return null;

    const key = getSecretKey({ secretKey: props?.secretKey });

    const session = (await verifyJWT({ token: authToken, key })) 
    return session as SessionUser | null;

   
}
 
export const protectPage = async (options?: { role?: string; orgRole?: string }) => {
  const session = await auth();
  if (!session) {
    return redirect(getLoginUrl());
  }

  if (options?.role && session.claims?.role !== options.role) {
    return redirect('/unauthorized');
  }

  return session;
};

export const protect = async <T>(
  options: { role?: string; orgRole?: string },
  fn: (session: SessionUser) => Promise<T>,
) => {
  const session = await auth();
  if (!session) {
    throw new Error('No session');
  }

  if (options.role && session.claims?.role !== options.role) {
    throw new Error('Not authorized');
  }

  if (options.orgRole && session.claims?.orgRole !== options.orgRole) {
    throw new Error('Not authorized');
  }

  return await fn(session);
};

export const adminOnly = async <T>(
  fn: (session: SessionUser) => Promise<T>,
) => {
  return protect({ role: 'admin' }, fn);
};