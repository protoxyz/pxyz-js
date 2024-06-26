import { useProtocolAuth } from '@protoxyz/auth-react';
import React from 'react';

export interface IsLoggedOutProps {
  children?: React.ReactNode;
}

export function IsLoggedOut({ children }: IsLoggedOutProps) {
  const { user } = useProtocolAuth();

  if (user) {
    return null;
  }

  return <>{children}</>;
}
