import { RedirectToSignInProps, useProtocolAuth } from '@protoxyz/auth';
import React from 'react';

export function RedirectToSignIn({
  redirectUrl,
  afterSignInUrl,
  afterSignUpUrl,
}: RedirectToSignInProps) {
  const { redirectToSignIn } = useProtocolAuth();

  React.useEffect(() => {
    redirectToSignIn?.({ redirectUrl, afterSignInUrl, afterSignUpUrl });
  }, []);
}
