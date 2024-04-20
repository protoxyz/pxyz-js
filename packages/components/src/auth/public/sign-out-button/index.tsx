import { useProtocolAuthLogout } from '@protoxyz/auth';
import { Button, ButtonProps } from '../../../ui/button';
import { Spinner } from '../../../ui/spinner';
import React from 'react';

interface SignOutButtonProps {
  children?: React.ReactNode;
  text?: string;
  button?: ButtonProps;
  afterSignOutUri?: string;
}
export function SignOutButton({
  children,
  button,
  text = 'Sign out',
  afterSignOutUri,
}: SignOutButtonProps) {
  const { logout, isLoggingOut } = useProtocolAuthLogout();

  if (children) {
    return (
      <div
        className="flex flex-1 items-center justify-between"
        onClick={isLoggingOut ? undefined : () => logout(afterSignOutUri)}
      >
        {isLoggingOut && <Spinner />}
        {!isLoggingOut && children}
      </div>
    );
  }

  return (
    <Button
      disabled={isLoggingOut}
      onClick={isLoggingOut ? undefined : () => logout(afterSignOutUri)}
      {...button}
      className="z-10"
    >
      {isLoggingOut && <Spinner color="white" />}
      {!isLoggingOut && text}
    </Button>
  );
}
