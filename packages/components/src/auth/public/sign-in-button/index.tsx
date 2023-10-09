import { Dialog, DialogTrigger } from '@radix-ui/react-dialog';
import { SignIn } from '../sign-in';
import { Button, ButtonProps } from '../../../ui/button';
import { DialogContent } from '../../../ui/dialog';
import { useProtocolAuth } from '@protoxyz/auth/client'; 
import React from 'react'

interface SignInButtonProps {
  mode: 'popup' | 'redirect';
  children?: React.ReactNode;
  text?: string;
  button?: ButtonProps;
  afterSignInRedirectUri?: string;
}

export function SignInButton({
  mode = 'redirect',
  children,
  button,
  afterSignInRedirectUri,
  text = 'Sign in',
}: SignInButtonProps) {
  // const { appearance } = useProtocolAuthAppearance({ component: "signIn" });
  const { tenant, navigate } = useProtocolAuth();

  const redirectToSignIn = React.useCallback(() => {
    if (mode === 'popup') return;
    navigate?.(tenant?.auth?.signInUri ?? '/sign-in');
  }, [tenant, mode]);

  const childContent = React.useMemo(() => {
    if (children) {
      return <div onClick={redirectToSignIn}>{children}</div>;
    }

    return (
      <Button onClick={redirectToSignIn} {...button} className="z-10">
        {text}
      </Button>
    );
  }, [children]);

  switch (mode) {
    case 'redirect':
      return childContent;
    case 'popup': {
      return (
        <Dialog>
          <DialogTrigger asChild>{childContent}</DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <SignIn afterSignInRedirectUri={afterSignInRedirectUri} />
          </DialogContent>
        </Dialog>
      );
    }
  }
}
