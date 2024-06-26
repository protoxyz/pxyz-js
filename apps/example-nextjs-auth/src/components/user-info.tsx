'use client';

import { useProtocolAuth } from '@protoxyz/auth';

export function UserInfo() {
  const { user } = useProtocolAuth();

  return (
    <div className="border-muted-foreground bg-background overflow-hidden rounded-xl border p-5">
      <h1 className="text-2xl font-bold">User Info</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
