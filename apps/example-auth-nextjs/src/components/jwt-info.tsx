'use client';

import { useProtocolAuth } from '@protoxyz/auth/client';
import { RefreshToken } from './refresh-token';

export function JWTInfo() {
  const { session } = useProtocolAuth();

  return (
    <div className="border-muted-foreground bg-background overflow-hidden rounded-xl border p-5">
      <h1 className="text-2xl font-bold">Session Info</h1>
      <RefreshToken />
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
