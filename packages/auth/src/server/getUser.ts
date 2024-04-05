import { ResponseStatus, UserProfile } from '@protoxyz/types';
import { ProtocolFrontendClient } from '@protoxyz/core';
import { getToken } from './getToken';

export async function getUser(config?: {
  domain: string;
  publicKey: string;
}): Promise<UserProfile | null> {
  const domain =
    config?.domain ??
    process.env.PXYZ_DOMAIN ??
    process.env.NEXT_PUBLIC_PXYZ_DOMAIN;
  const publicKey =
    config?.publicKey ??
    process.env.PXYZ_PUBLIC_KEY ??
    process.env.NEXT_PUBLIC_PXYZ_PUBLIC_KEY;

  console.log({
    domain,
    publicKey,
  });

  // const token =
  //   (await getCookieToken({ headers })) || (await getBearerToken({ headers }));
  const token = await getToken();

  if (!token) return null;

  const protocol = new ProtocolFrontendClient({
    accessToken: token,
    baseUrl: domain,
  });

  const userResponse = await protocol.auth.users.profile({
    headers: {
      'x-protocol-hostname': domain,
      'x-protocol-tenant-pkey': publicKey,
    },
  });

  if (userResponse.status === ResponseStatus.Error) {
    return null;
  }

  return userResponse?.data?.user ?? null;
}
