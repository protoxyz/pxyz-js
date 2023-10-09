import { useProtocolAuth } from '@protoxyz/auth/client';
import React from 'react';

export function RedirectToUserProfile() {
  const { redirectToUserProfile } = useProtocolAuth();

  React.useEffect(() => {
    redirectToUserProfile?.();
  }, []);
}
