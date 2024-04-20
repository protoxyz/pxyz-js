import React from 'react';
import { useProtocolAuth } from '@protoxyz/auth-react';

export interface IsLoggedInProps {
  children?: React.ReactNode;
}
export function IsLoggedIn({ children }: IsLoggedInProps): JSX.Element | null {
  const { user } = useProtocolAuth();

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
