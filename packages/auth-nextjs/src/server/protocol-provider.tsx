// import 'server-only';
import { ProtocolAuthProvider as ProtocolAuthProviderReact } from '@protoxyz/auth-react';
import { Protocol } from '@protoxyz/core';
import { AuthAppearance } from '@protoxyz/themes';
import { Tenant, ResponseStatus } from '@protoxyz/types';
import { getUser } from './getUser';
import { getAuth } from './getAuth';
import { headers as nextheaders } from 'next/headers';

interface ProtocolAuthProviderProps {
  children: React.ReactNode;
  domain?: string;
  publicKey?: string;
  appearance?: AuthAppearance;
}

export async function ProtocolAuthProvider({
  children,
  domain,
  publicKey,
  appearance,
}: ProtocolAuthProviderProps) {
  const headers = nextheaders();

  const resolvedDomain =
    domain ??
    headers.get('x-protocol-hostname') ??
    process.env.PXYZ_AUTH_DOMAIN ??
    process.env.NEXT_PUBLIC_PXYZ_AUTH_DOMAIN ??
    '';
  const resolvedPublicKey =
    publicKey ??
    headers.get('x-protocol-instance-pkey') ??
    process.env.PXYZ_AUTH_PUBLIC_KEY ??
    process.env.NEXT_PUBLIC_PXYZ_AUTH_PUBLIC_KEY ??
    '';

  if (!resolvedDomain)
    throw new Error('No domain provided in ProtocolAuthProvider');
  if (!resolvedPublicKey)
    throw new Error('No public key provided in ProtocolAuthProvider');

  if (process.env.NODE_ENV === 'development') {
    console.log('[Protocol Auth]');
    console.log('resolvedDomain', resolvedDomain);
    console.log('resolvedPublicKey', resolvedPublicKey);
  }

  const protocolClient = new Protocol({
    debug: process.env.NODE_ENV !== 'production',
    baseUrl: resolvedDomain,
  });

  let tenant: Tenant | null = null;

  try {
    const result = await protocolClient.auth.tenants.getByPublicKey({
      path: { publicKey: resolvedPublicKey },
    });
    if (result.status !== ResponseStatus.Success) {
      console.log(result);
      throw new Error(
        'Could not retrieve instance: pkey=' +
          resolvedPublicKey +
          ' domain=' +
          resolvedDomain,
      );
    }
    tenant = result.data.tenant;
  } catch (e) {
    console.log('ERROR!!!!!');
    console.log(e);
  }

  const sessionUser = await getAuth({});

  const user = await getUser({
    domain: resolvedDomain,
    publicKey: resolvedPublicKey,
  });

  return (
    <ProtocolAuthProviderReact
      appearance={appearance}
      domain={resolvedDomain}
      publicKey={resolvedPublicKey}
      tenant={tenant}
      user={user}
      userId={sessionUser?.sub}
      sessionId={sessionUser?.claims?.sessionId}
      org={user?.organizations?.find(
        (org) => org.id === sessionUser?.claims?.orgId,
      )}
      orgId={sessionUser?.claims?.orgId}
      // orgRole={sessionUser?.claims?.orgRole}
    >
      {children}
    </ProtocolAuthProviderReact>
  );
}
