'use client';

import { useProtocolAuth } from '@protoxyz/auth/client';

export function UserInfo() {
  const { user } = useProtocolAuth();

  return (
    <div className="overflow-hidden rounded-xl border p-5">
      <h1 className="text-2xl font-bold">User Info</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
