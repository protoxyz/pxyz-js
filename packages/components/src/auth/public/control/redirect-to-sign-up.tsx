import { RedirectToSignUpProps, useProtocolAuth } from '@protoxyz/auth-react';
import React from 'react';

export function RedirectToSignUp({
  redirectUrl,
  afterSignInUrl,
  afterSignUpUrl,
}: RedirectToSignUpProps) {
  const { redirectToSignUp } = useProtocolAuth();
  React.useEffect(() => {
    redirectToSignUp?.({ redirectUrl, afterSignInUrl, afterSignUpUrl });
  }, []);
}
