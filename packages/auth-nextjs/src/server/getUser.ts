import { headers as nextHeaders } from 'next/headers';

import { ResponseStatus, UserProfile } from '@protoxyz/types';
import { ProtocolFrontendClient } from '@protoxyz/core';
import { getBearerToken, getCookieToken } from './util';

export async function getUser({
  domain,
  publicKey,
}: {
  domain: string;
  publicKey: string;
}): Promise<UserProfile | null> {
  const headers = nextHeaders();

  const token =
    (await getCookieToken({ headers })) || (await getBearerToken({ headers }));

  if (!token) return null;

  const protocol = new ProtocolFrontendClient({ accessToken: token });

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
