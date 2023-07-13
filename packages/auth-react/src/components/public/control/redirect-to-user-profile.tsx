import { useProtocolAuth } from '../../../contexts/protocol-context';
import { useEffect } from 'react';

export function RedirectToUserProfile() {
  const { redirectToUserProfile } = useProtocolAuth();

  useEffect(() => {
    redirectToUserProfile();
  }, []);
}
