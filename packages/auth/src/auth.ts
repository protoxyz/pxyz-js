import { SessionUser } from '@protoxyz/types';
import { headers as nextHeaders } from 'next/headers';
import { verifyJWT } from './jwt';
import { getBearerToken, getCookieToken, getSecretKey } from './util';
import { redirect } from 'next/navigation';
import { getLoginUrl } from './urls';

export interface AuthOptions {
  token?: string | null | undefined;
  secretKey?: string | null | undefined;
}

export async function auth(options?: AuthOptions) {
  const authToken =
    options?.token ||
    (await getCookieToken({ headers: nextHeaders() })) ||
    (await getBearerToken({ headers: nextHeaders() }));

  if (!authToken) return null;

  const key = getSecretKey({ secretKey: options?.secretKey });

  const session = await verifyJWT({ token: authToken, key });
  return session as SessionUser | null;
}

export interface ProtectOptions {
  role?: string;
  orgRole?: string;
}
export const protectPage = async (options?: ProtectOptions, authOptions?: AuthOptions) => { 
  const session = await auth(authOptions);
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
  authOptions?: AuthOptions,
) => {
  const session = await auth(authOptions);
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
  authOptions?: AuthOptions,
) => {
  return protect({ role: 'admin' }, fn, authOptions);
};
