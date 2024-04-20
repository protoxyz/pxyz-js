import { SignInAttempt, SignUpAttempt } from '@protoxyz/types';
import React from 'react';

export interface ProtocolAuthClientContextState {
  signIn: SignInAttempt | null;
  signUp: SignUpAttempt | null;

  setSignIn: (attempt: SignInAttempt | null) => void;
  setSignUp: (attempt: SignUpAttempt | null) => void;
}

export const ProtocolAuthClientContext =
  React.createContext<ProtocolAuthClientContextState>({
    signIn: null,
    signUp: null,
    setSignIn: (attempt: SignInAttempt | null) => {
      throw new Error('Not implemented: ' + attempt?.toString());
    },
    setSignUp: (attempt: SignUpAttempt | null) => {
      throw new Error('Not implemented' + attempt?.toString());
    },
  });

export const ProtocolAuthClientProvider = ({
  children,
  clientState,
}: {
  children?: React.ReactNode;
  clientState: ProtocolAuthClientContextState;
}) => {
  return (
    <ProtocolAuthClientContext.Provider
      value={{
        ...clientState,
      }}
    >
      {children}
    </ProtocolAuthClientContext.Provider>
  );
};

export const useProtocolAuthClient = () => {
  const context = React.useContext(ProtocolAuthClientContext);
  if (context === undefined) {
    throw new Error(
      'useProtocolAuthClient must be used within a ProtocolAuthClientProvider',
    );
  }
  return context;
};

export const useProtocolAuthSignInClient = () => {
  const ctx = React.useContext(ProtocolAuthClientContext);

  if (!ctx) {
    throw new Error(
      'useProtocolAuthSignInClient must be used within a ProtocolAuthClientProvider',
    );
  }

  return ctx.signIn;
};

export const useProtocolAuthSignUpClient = () => {
  const ctx = React.useContext(ProtocolAuthClientContext);

  if (!ctx) {
    throw new Error(
      'useProtocolAuthSignUpClient must be used within a ProtocolAuthClientProvider',
    );
  }

  return ctx.signUp;
};
