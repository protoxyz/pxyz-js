import { useProtocolAuth } from '@protoxyz/auth';
import React from 'react';

export interface IsLoadedProps {
  children?: React.ReactNode;
}

export function IsLoaded({ children }: IsLoadedProps) {
  const { loaded } = useProtocolAuth();

  if (loaded !== true) {
    return null;
  }

  return <>{children}</>;
}
