'use client';
import {
  ProtocolAuthContext,
  ProtocolAuthProviderState,
} from './protocol-context';
import { ProtocolFrontendClient } from '@protoxyz/api-clients';
import React from 'react';
import { AuthAppearance, mergeAppearance } from '@protoxyz/themes';
import {
  Tenant,
  OrganizationWithRole,
  SessionUser,
  SignInAttempt,
  SignUpAttempt,
  UserProfile,
  ResponseStatus,
  AuthVerificationStrategy,
  AllowedSecondFactorStrategy,
  AllowedFirstFactorStrategy,
} from '@protoxyz/types';
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
// import { Variables } from '../components/custom-ui/variables';
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
  role?: string | null;
  permissions?: string[] | null;
  org?: OrganizationWithRole | null;
  orgId?: string | null;
  orgRole?: string | null;
  orgPermissions?: string[] | null;
  session?: SessionUser | null;
  sessionId?: string | null;
  children?: React.ReactNode;
  publicKey?: string;
  domain?: string;
  appearance?: AuthAppearance;
  navigate?: (url: string) => void;
  tokenCache?: TokenCache;
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

  const firstFactorStrategies = tenant ? getFirstFactorStrategies(tenant) : [];
  const secondFactorStrategies = tenant
    ? getSecondFactorStrategies(tenant)
    : [];
  const initialFirstFactorStrategy = tenant
    ? getInitialFirstFactorStrategy(firstFactorStrategies)
    : null;
  const initialSecondFactorStrategy = tenant
    ? getInitialSecondFactorStrategy(secondFactorStrategies)
    : null;
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
    firstFactorStrategies,
    secondFactorStrategies,
    firstFactorStrategy: initialFirstFactorStrategy,
    secondFactorStrategy: initialSecondFactorStrategy,
    appearance: mergeAppearance({
      appearance,
    }),
    domain:
      domain ??
      process.env.PXYZ_DOMAIN ??
      process.env.NEXT_PUBLIC_PXYZ_DOMAIN ??
      process.env.EXPO_PUBLIC_PXYZ_DOMAIN ??
      '',
    publicKey:
      publicKey ??
      process.env.PXYZ_PUBLIC_KEY ??
      process.env.NEXT_PUBLIC_PXYZ_PUBLIC_KEY ??
      process.env.EXPO_PUBLIC_PXYZ_PUBLIC_KEY ??
      '',
    protocol: new ProtocolFrontendClient({
      credentials: true,
      baseUrl:
        domain ??
        process.env.PXYZ_DOMAIN ??
        process.env.NEXT_PUBLIC_PXYZ_DOMAIN ??
        process.env.EXPO_PUBLIC_PXYZ_DOMAIN,
      debug: process.env.NODE_ENV !== 'production',
      accessToken: getAccessTokenFromLocalStorage(tenant),
    }),
    setToken: (token: string) => {
      if (
        isBrowser() &&
        !isReactNative() &&
        process.env.NODE_ENV === 'development'
      ) {
        localStorage.setItem(SESSION_COOKIE_NAME, token);
      }

      tokenCache?.saveToken(SESSION_COOKIE_NAME, token);

      state.protocol.setAccessToken(token);

      if (token) {
        state.protocol.auth.users.profile({}).then((response) => {
          if (response.status === ResponseStatus.Success) {
            setState((state) => ({
              ...state,
              user: response.data?.user ?? null,
              userId: response.data?.user?.id ?? null,
            }));
          }
        });
      }
    },

    setFirstFactorStrategy: (strategy: AllowedFirstFactorStrategy | null) => {
      setRouteState((state) => ({
        ...state,
        firstFactorStrategy: strategy,
      }));
    },

    setSecondFactorStrategy: (strategy: AllowedSecondFactorStrategy | null) => {
      setRouteState((state) => ({
        ...state,
        secondFactorStrategy: strategy,
      }));
    },
  });

  React.useEffect(() => {
    tokenCache?.getToken(SESSION_COOKIE_NAME).then((token) => {
      if (token) state.setToken(token);
    });
  }, []);

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
  React.useEffect(() => {
    if (state.loaded && state.user) return;

    async function loadUser() {
      if (state.user) return;

      const accessToken = getAccessTokenFromLocalStorage(state.tenant);
      if (accessToken) {
        state.protocol.setAccessToken(accessToken);
      }

      const userResponse = await state.protocol.auth.users.profile({});
      const user = userResponse.data?.user;
      const sessionUser = userResponse.data?.sessionUser;

      setState((state) => ({
        ...state,

        user: user ?? null,
        userId: user?.id ?? null,
        role: sessionUser?.claims?.role,
        permissions: sessionUser?.claims?.permissions,
        orgId: sessionUser?.claims?.orgId,
        orgRole: sessionUser?.claims?.orgRole,
        orgPermissions: sessionUser?.claims?.orgPermissions,
        sessionId: sessionUser?.claims?.sessionId,
        session: sessionUser ?? null,
      }));
    }

    async function loadTenant() {
      if (state.loaded) return;

      const response = await state.protocol.auth.tenants.getByPublicKey({
        path: { publicKey: state.publicKey ?? '' },
      });

      if (
        response.status !== ResponseStatus.Success ||
        !response.data?.tenant
      ) {
        throw new Error('Failed to get tenant');
      }

      const tenant = response.data?.tenant;

      if (tenant) {
        const firstFactorStrategies = getFirstFactorStrategies(tenant);
        const secondFactorStrategies = getSecondFactorStrategies(tenant);
        const firstFactorStrategy = getInitialFirstFactorStrategy(
          firstFactorStrategies,
        );
        const secondFactorStrategy = getInitialSecondFactorStrategy(
          secondFactorStrategies,
        );

        setState((state) => ({
          ...state,
          tenant,
          firstFactorStrategies,
          secondFactorStrategies,
          firstFactorStrategy,
          secondFactorStrategy,
          loaded: true,
        }));
      }
    }

    loadTenant();
    if (!user) loadUser();
  }, []);

  return (
    <ProtocolAuthContext.Provider value={{ state, setState }}>
      <ProtocolAuthFlowProvider routeState={routeState}>
        <ProtocolAuthClientProvider clientState={clientState}>
          {/* <IsLoaded> */}
          {/* <Variables variables={appearance?.variables} /> */}
          {children}
          {/* </IsLoaded> */}
        </ProtocolAuthClientProvider>
      </ProtocolAuthFlowProvider>
    </ProtocolAuthContext.Provider>
  );
};

const getFirstFactorStrategies = (
  tenant: Tenant,
): AllowedFirstFactorStrategy[] | null => {
  const strategies = [];

  if (tenant?.auth?.strategyPhoneCodeEnabled)
    strategies.push(AuthVerificationStrategy.phone_code);

  if (tenant?.auth?.strategyEmailCodeEnabled)
    strategies.push(AuthVerificationStrategy.email_code);

  if (tenant?.auth?.strategyEmailLinkEnabled)
    strategies.push(AuthVerificationStrategy.email_link);

  if (tenant?.auth.strategyUsernamePasswordEnabled)
    strategies.push(AuthVerificationStrategy.username_password);

  if (tenant?.auth.strategyEmailPasswordEnabled)
    strategies.push(AuthVerificationStrategy.email_password);

  if (tenant?.auth.strategyPhonePasswordEnabled)
    strategies.push(AuthVerificationStrategy.phone_password);

  return strategies;
};

const getSecondFactorStrategies = (
  tenant: Tenant,
): AllowedSecondFactorStrategy[] | null => {
  const strategies = [];

  if (tenant?.auth?.strategyAuthenticatorCodeEnabled)
    strategies.push(AuthVerificationStrategy.authenticator_code);

  if (tenant?.auth.strategySecurityKeyEnabled)
    strategies.push(AuthVerificationStrategy.security_key);

  return strategies;
};

const getInitialFirstFactorStrategy = (
  strategies: AllowedFirstFactorStrategy[],
): AllowedFirstFactorStrategy | null => {
  if (strategies.length > 0) return strategies[0];
  return null;
};

const getInitialSecondFactorStrategy = (
  strategies: AllowedSecondFactorStrategy[],
): AllowedSecondFactorStrategy | null => {
  if (strategies.length > 0) return strategies[0];

  return null;
};

const getAccessTokenFromLocalStorage = (tenant: Tenant | undefined) => {
  if (
    isBrowser() &&
    typeof localStorage !== 'undefined' &&
    tenant?.environment === 'development'
  ) {
    return localStorage.getItem(SESSION_COOKIE_NAME);
  }
};
