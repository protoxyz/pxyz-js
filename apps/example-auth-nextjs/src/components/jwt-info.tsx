'use client';

import { useProtocolAuth, useProtocolAuthSession } from '@protoxyz/auth-react';
import { RefreshToken } from './refresh-token';

export function JWTInfo() {
  const { session } = useProtocolAuth();
  const { issueToken } = useProtocolAuthSession();

  return (
    <div className="border rounded-xl p-5">
      <h1 className="text-2xl font-bold">Session Info</h1>
      <RefreshToken />
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
