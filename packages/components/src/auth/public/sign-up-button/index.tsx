import { Dialog, DialogTrigger } from '@radix-ui/react-dialog';
import { SignUp } from '../sign-up';
import { Button, ButtonProps } from '../../../ui/button';
import { DialogContent } from '../../../ui/dialog';
import { useProtocolAuth } from '@protoxyz/auth';
import React from 'react';

interface SignUpButtonProps {
  mode: 'popup' | 'redirect';
  children?: React.ReactNode;
  text?: string;
  button?: ButtonProps;
  afterSignUpRedirectUri?: string;
}

export function SignUpButton({
  mode = 'redirect',
  children,
  button,
  afterSignUpRedirectUri,
  text = 'Sign up',
}: SignUpButtonProps) {
  // const { appearance } = useProtocolAuthAppearance({ component: "signUp" });
  const { tenant, navigate } = useProtocolAuth();

  const redirectToSignUp = React.useCallback(() => {
    if (mode === 'popup') return;
    navigate?.(tenant?.auth?.signUpUri ?? '/sign-up');
  }, [tenant, mode]);

  const childContent = React.useMemo(() => {
    if (children) {
      return <div onClick={redirectToSignUp}>{children}</div>;
    }

    return (
      <Button onClick={redirectToSignUp} {...button} className="z-10">
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
            <SignUp afterSignUpRedirectUri={afterSignUpRedirectUri} />
          </DialogContent>
        </Dialog>
      );
    }
  }
}
