import {
  ProtocolAuthContext,
  ProtocolAuthProviderState,
} from './protocol-context';
import { Protocol } from '@protoxyz/core';
import React, { useEffect } from 'react';
import { AuthAppearance, mergeAppearance } from '@protoxyz/themes';
import {
  AuthInstance,
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

const initialState = {
  instance: null,
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
  instance?: AuthInstance | null;
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
}

export const ProtocolAuthProvider = ({
  children,
  domain,
  publicKey,
  instance,
  user,
  userId,
  org,
  orgId,
  orgRole,
  session,
  sessionId,
  appearance,
  navigate,
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

  /*
   * This is the protocol state. It is used to store the protocol instance, the appearance data, and the protocol client
   */
  const [state, setState] = React.useState<ProtocolAuthProviderState>({
    ...initialState,
    loaded: !!instance,
    instance: { ...instance },
    user,
    userId,
    org,
    orgId,
    orgRole,
    session,
    sessionId,
    appearance: mergeAppearance({
      appearance,
    }),
    domain: domain ?? process.env.NEXT_PUBLIC_PXYZ_AUTH_DOMAIN ?? '',
    publicKey: publicKey ?? process.env.NEXT_PUBLIC_PXYZ_AUTH_PUBLIC_KEY ?? '',
    protocol: new Protocol({
      credentials: true,
      baseUrl: process.env.NEXT_PUBLIC_PXYZ_AUTH_DOMAIN,
      debug: true,
    }),
  });

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
        Load the instance if it hasn't already been provided by the server component.
    */
  useEffect(() => {
    if (state.loaded) {
      return;
    }

    async function loadInstance() {
      const response = await state.protocol.auth.instances.getByPublicKey({
        path: { publicKey: state.publicKey ?? '' },
      });

      if (response.status !== 'success' || !response.data.instance) {
        throw new Error('Failed to get instance');
      }

      const instance = response.data.instance;

      setState((state) => ({
        ...state,
        loaded: true,
        instance,
      }));
    }

    loadInstance();
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
