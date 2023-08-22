'use client';

import { useProtocolAuthSession } from '@protoxyz/auth-react';

export function RefreshToken() {
  const { issueToken } = useProtocolAuthSession();

  return (
    <button
      onClick={() => issueToken({})}
      className="bg-primary px-5 py-2 text-white rounded-md"
    >
      Refresh Token
    </button>
  );
}
