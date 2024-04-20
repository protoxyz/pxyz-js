import { RedirectToSignInProps, RedirectToSignUpProps } from '../types/auth';
import { ProtocolFrontendClient } from '@protoxyz/api-clients';
import { AuthAppearance, AuthComponentType } from '@protoxyz/themes';
import {
  Tenant,
  OrganizationWithRole,
  SessionUser,
  UserProfile,
  AllowedFirstFactorStrategy,
  AllowedSecondFactorStrategy,
} from '@protoxyz/types';
import React from 'react';
import { TokenCache } from '../types/tokenCache';
import { SESSION_COOKIE_NAME, deleteSessionCookie } from '../lib/cookies';
import { isBrowser, isReactNative } from '../lib/utils';

export interface ProtocolAuthProviderState {
  protocol: ProtocolFrontendClient;
  loaded: boolean;
  tenant: Tenant | null | undefined;
  domain: string;
  publicKey: string;

  appearance: AuthAppearance;

  firstFactorStrategies: AllowedFirstFactorStrategy[] | null | undefined;
  secondFactorStrategies: AllowedSecondFactorStrategy[] | null | undefined;
  firstFactorStrategy: AllowedFirstFactorStrategy | null | undefined;
  secondFactorStrategy: AllowedSecondFactorStrategy | null | undefined;
  setFirstFactorStrategy: (strategy: AllowedFirstFactorStrategy) => void;
  setSecondFactorStrategy: (strategy: AllowedSecondFactorStrategy) => void;

  user: UserProfile | null | undefined;
  userId: string | null | undefined;
  org: OrganizationWithRole | null | undefined;
  orgId: string | null | undefined;
  orgRole: string | null | undefined;
  session: SessionUser | null | undefined;
  sessionId: string | null | undefined;

  setToken: ((token: string) => void ) | undefined;
  navigate: ((url: string) => void ) | undefined;
  tokenCache: TokenCache | undefined;
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
      if (isBrowser() && !isReactNative()) {
        window.location.href = url ?? '/';
      }
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
    reset: () => {
      authCtx.state.tokenCache?.deleteToken(SESSION_COOKIE_NAME);
      deleteSessionCookie(authCtx.state.tenant);

      authCtx.setState({
        ...authCtx.state,
        user: null,
        userId: null,
        org: null,
        orgId: null,
        orgRole: null,
        session: null,
        sessionId: null,
      });
    },
    ...(authCtx.state ?? {}),
    ...(settersCtx ?? {}),
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
