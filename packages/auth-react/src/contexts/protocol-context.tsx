import { RedirectToSignInProps, RedirectToSignUpProps } from '../types/auth';
import { Protocol } from '@protoxyz/core';
import { AuthAppearance, AuthComponentType } from '@protoxyz/themes';
import {
  Tenant,
  OrganizationWithRole,
  SessionUser,
  UserProfile,
} from '@protoxyz/types';
import * as React from 'react';

export interface ProtocolAuthProviderState {
  protocol: Protocol;
  loaded: boolean;
  tenant: Tenant | null;
  domain: string;
  publicKey: string;

  appearance: AuthAppearance;

  user: UserProfile | null;
  userId: string | null;
  org: OrganizationWithRole | null;
  orgId: string | null;
  orgRole: string | null;
  session: SessionUser | null;
  sessionId: string | null;
}

export interface ProtocolAuthContextState {
  state: ProtocolAuthProviderState;
  setState: React.Dispatch<React.SetStateAction<ProtocolAuthProviderState>>;
}

export const ProtocolAuthContext = React.createContext({});

export interface ProtocolAuthSettersState {
  navigate: (url: string) => void;
  redirectToUserProfile?: () => void;
  redirectToSignIn?: (props?: RedirectToSignInProps) => void;
  redirectToSignUp?: (props?: RedirectToSignUpProps) => void;
}

export const ProtocolAuthSettersContext =
  React.createContext<ProtocolAuthSettersState>({
    navigate: (url: string) => {
      window.location.href = url ?? '/';
    },
    redirectToUserProfile: () => {
      throw new Error('redirectToUserProfile must be implemented');
    },
    redirectToSignIn: (props?: RedirectToSignInProps) => {
      throw new Error(
        'redirectToSignIn must be implemented' + props?.toString(),
      );
    },
    redirectToSignUp: (props?: RedirectToSignUpProps) => {
      throw new Error(
        'redirectToSignUp must be implemented' + props?.toString(),
      );
    },
  });

export const useProtocolAuth = () => {
  const authCtx = React.useContext(
    ProtocolAuthContext,
  ) as ProtocolAuthContextState;
  const settersCtx = React.useContext(
    ProtocolAuthSettersContext,
  ) as ProtocolAuthSettersState;

  if (!authCtx || !settersCtx) {
    throw new Error(
      'useProtocolAuth must be used within a ProtocolAuthProvider',
    );
  }

  return {
    setState: authCtx.setState,
    ...(authCtx.state ?? {}),
    ...(settersCtx ?? {}),
    // setState: authCtx?.setState,
    // publicKey: authCtx?.state?.publicKey,
    // domain: authCtx?.state?.domain,
    // protocol: authCtx?.state?.protocol,
    // loaded: authCtx?.state?.loaded,
    // user: authCtx?.state?.user,
    // userId: authCtx?.state?.userId,
    // tenant: authCtx?.state?.tenant,
    // org: authCtx?.state?.org,
    // orgId: authCtx?.state?.orgId,
    // orgRole: authCtx?.state?.orgRole,
    // session: authCtx?.state?.session,
    // sessionId: authCtx?.state?.sessionId,
    // redirectToUserProfile: settersCtx?.redirectToUserProfile,
    // redirectToSignIn: settersCtx?.redirectToSignIn,
    // redirectToSignUp: settersCtx?.redirectToSignUp,
    // navigate: settersCtx?.navigate,
  };
};

export const useProtocolAuthTenant = () => {
  const ctx = React.useContext(ProtocolAuthContext) as ProtocolAuthContextState;

  if (!ctx) {
    throw new Error(
      'useProtocolAuthTenant must be used within a ProtocolAuthProvider',
    );
  }

  return { tenant: ctx?.state?.tenant };
};

export const useProtocolAuthAppearance = ({
  component,
}: {
  component: AuthComponentType;
}) => {
  const ctx = React.useContext(ProtocolAuthContext) as ProtocolAuthContextState;

  if (!ctx) {
    throw new Error(
      'useProtocolAuthAppearance must be used within a ProtocolAuthProvider',
    );
  }

  // const appearance = getMergedTheme({ appearance: ctx?.state?.appearance, component });

  return { appearance: ctx?.state?.appearance };
};
