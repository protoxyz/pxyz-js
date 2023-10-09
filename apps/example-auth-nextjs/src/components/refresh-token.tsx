'use client';

import { useProtocolAuth, useProtocolAuthSession } from '@protoxyz/auth/client';

export function RefreshToken() {
  const { issueToken } = useProtocolAuthSession();
  const { session } = useProtocolAuth();

  return (
    <button
      onClick={() =>
        issueToken({
          orgId: session?.claims?.orgId,
        })
      }
      className="bg-primary rounded-md px-5 py-2 text-white"
    >
      Refresh Token
    </button>
  );
}
