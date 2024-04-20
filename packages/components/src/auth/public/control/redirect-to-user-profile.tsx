import { useProtocolAuth } from '@protoxyz/auth';
import React from 'react';

export function RedirectToUserProfile() {
  const { redirectToUserProfile } = useProtocolAuth();

  React.useEffect(() => {
    redirectToUserProfile?.();
  }, []);
}
