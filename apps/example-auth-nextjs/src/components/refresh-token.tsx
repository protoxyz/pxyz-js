'use client';

import { useProtocolAuth } from '@protoxyz/auth-react';

export function RefreshToken() {
  const { refreshSession } = useProtocolAuth();

  return (
    <button className="bg-primary px-5 py-2 text-white rounded-md">
      Refresh Token
    </button>
  );
}
