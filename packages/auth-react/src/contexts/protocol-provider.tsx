import {
  ProtocolAuthContext,
  ProtocolAuthProviderState,
} from './protocol-context';
import { Protocol } from '@protoxyz/core';
import React, { useEffect } from 'react';
import { AuthAppearance, mergeAppearance } from '@protoxyz/themes';
import {
  Tenant,
  OrganizationWithRole,
  SessionUser,
  SignInAttempt,
  SignUpAttempt,
  UserProfile,
} from '@protoxyz/types';
import { IsLoaded } from '../components/public/control/is-loaded';
import {
  OrganizationProfileFlowRoute,
  ProtocolAuthFlowContextState,
  ProtocolAuthFlowProvider,
  SignInFlowRoute,
  SignUpFlowRoute,
  UserProfileFlowRoute,
} from './flow-context';
import {
  ProtocolAuthClientContextState,
  ProtocolAuthClientProvider,
} from './client-context';
import { Variables } from '../components/custom-ui/variables';
import { SESSION_COOKIE_NAME } from '../lib/cookies';
import { isBrowser, isReactNative } from '../lib/utils';
import { TokenCache } from '../types/tokenCache';

const initialState = {
  tenant: null,
  appearance: {},
  user: null,
  loaded: false,
  session: null,
  sessionId: null,
  org: null,
  orgId: null,
  orgRole: null,
};

export interface ProtocolAuthProviderProps {
  tenant?: Tenant | null;
  user?: UserProfile | null;
  userId?: string | null;
  org?: OrganizationWithRole | null;
  orgId?: string | null;
  orgRole?: string | null;
  session?: SessionUser | null;
  sessionId?: string | null;
  children?: React.ReactNode;
  publicKey?: string;
  domain?: string;
  appearance?: AuthAppearance;
  navigate?: (url: string) => void;
  tokenCache?: TokenCache
}

export const ProtocolAuthProvider = ({
  children,
  domain,
  publicKey,
  tenant,
  user,
  userId,
  org,
  orgId,
  orgRole,
  session,
  sessionId,
  appearance,
  navigate,
  tokenCache,
}: ProtocolAuthProviderProps) => {
 
  /*
   * This is the flow state. It is used to store the current flow route and the function to update it
   */
  const [routeState, setRouteState] =
    React.useState<ProtocolAuthFlowContextState>({
      signIn: {
        route: SignInFlowRoute.signIn,
        params: {},
        setRoute: (
          route: SignInFlowRoute,
          params: Record<string, string> = {},
        ) => {
          setRouteState((state) => ({
            ...state,
            signIn: {
              ...state.signIn,
              params,
              route,
            },
          }));
        },
      },
      signUp: {
        route: SignUpFlowRoute.signUp,
        params: {},
        setRoute: (
          route: SignUpFlowRoute,
          params: Record<string, string> = {},
        ) => {
          setRouteState((state) => ({
            ...state,
            signUp: {
              ...state.signUp,
              route,
              params,
            },
          }));
        },
      },
      organizationProfile: {
        route: OrganizationProfileFlowRoute['organizationProfile:members'],
        params: {},
        setRoute: (
          route: OrganizationProfileFlowRoute,
          params: Record<string, string> = {},
        ) => {
          setRouteState((state) => ({
            ...state,
            organizationProfile: {
              ...state.organizationProfile,
              route,
              params,
            },
          }));
        },
      },
      userProfile: {
        route: UserProfileFlowRoute['userProfile:settings'],
        params: {},
        setRoute: (
          route: UserProfileFlowRoute,
          params: Record<string, string> = {},
        ) => {
          setRouteState((state) => ({
            ...state,
            userProfile: {
              ...state.userProfile,
              route,
              params,
            },
          }));
        },
      },
    });

  let accessToken = null;

  if (
    typeof localStorage !== 'undefined' &&
    tenant?.environment === 'development'
  ) {
    accessToken = localStorage.getItem(SESSION_COOKIE_NAME);
  }

  /*
   * This is the protocol state. It is used to store the protocol tenant, the appearance data, and the protocol client
   */
  const [state, setState] = React.useState<ProtocolAuthProviderState>({
    ...initialState,
    loaded: !!tenant,
    tenant: { ...tenant },
    user,
    userId,
    org,
    orgId,
    orgRole,
    session,
    sessionId,
    navigate,
    tokenCache,
    appearance: mergeAppearance({
      appearance,
    }),
    domain: domain ?? process.env.NEXT_PUBLIC_PXYZ_DOMAIN ?? process.env.EXPO_PUBLIC_PXYZ_DOMAIN ?? '',
    publicKey: publicKey ?? process.env.NEXT_PUBLIC_PXYZ_PUBLIC_KEY ?? process.env.EXPO_PUBLIC_PXYZ_PUBLIC_KEY ?? '',
    protocol: new Protocol({
      credentials: true,
      baseUrl: domain ?? process.env.NEXT_PUBLIC_PXYZ_DOMAIN ?? process.env.EXPO_PUBLIC_PXYZ_DOMAIN,
      debug: process.env.NODE_ENV !== 'production',
      accessToken,
    }),
    setToken: (token: string) => {
      if (isBrowser() && !isReactNative()) {
        localStorage.setItem(SESSION_COOKIE_NAME, token);
      }

      tokenCache?.saveToken(SESSION_COOKIE_NAME, token);

      state.protocol.setAccessToken(token);
  
      if (token) {
        state.protocol.auth.users.profile({}).then((response) => {
          if (response.status === 'success') {
            setState((state) => ({
              ...state,
              user: response.data?.user ?? null,
              userId: response.data?.user?.id ?? null,
            }));
          }
        });
      }
    }
  });


  useEffect(() => {
    tokenCache?.getToken(SESSION_COOKIE_NAME).then((token) => {
      if (token)
      state.setToken(token)
    });
  }, [
    tokenCache, 
  ]) 
  

  /*
   * This is the client state. It is used to store the sign in and sign up attempt state of the client
   */
  const [clientState, setClientState] =
    React.useState<ProtocolAuthClientContextState>({
      signIn: null,
      signUp: null,

      setSignIn: (signIn: SignInAttempt) => {
        setClientState((state) => ({
          ...state,
          signIn,
        }));
      },

      setSignUp: (signUp: SignUpAttempt) => {
        setClientState((state) => ({
          ...state,
          signUp,
        }));
      },
    });

  /*
    Load the tenant if it hasn't already been provided by the server component.
  */
  useEffect(() => { 

    if (state.loaded) {
      return;
    }

    async function loadTenant() { 
      const response = await state.protocol.auth.tenants.getByPublicKey({
        path: { publicKey: state.publicKey ?? '' },
      });

      if (response.status !== 'success' || !response.data?.tenant) {
        throw new Error('Failed to get tenant');
      }

      const tenant = response.data?.tenant;
 
      setState((state) => ({
        ...state,
        loaded: true,
        tenant,
      }));
    }

    loadTenant();
  }, []);

  if (!state.loaded) return null;
 
  return (
    <ProtocolAuthContext.Provider value={{ state, setState }}>
      <ProtocolAuthFlowProvider routeState={routeState}>
        <ProtocolAuthClientProvider clientState={clientState}>
          <IsLoaded>
            <Variables variables={appearance?.variables} />
            {children}
          </IsLoaded>
        </ProtocolAuthClientProvider>
      </ProtocolAuthFlowProvider>
    </ProtocolAuthContext.Provider>
  );
};
