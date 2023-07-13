import * as React from 'react';

export enum SignInFlowRoute {
  'signIn' = 'signIn',
  'signIn:verifyFirstFactor' = 'signIn:verifyFirstFactor',
  'signIn:verifySecondFactor' = 'signIn:verifySecondFactor',
  'signIn:success' = 'signIn:success',
  'signIn:forgotPassword' = 'signIn:forgotPassword',
  'signIn:resetPassword' = 'signIn:resetPassword',
  'signIn:resetPasswordSuccess' = 'signIn:resetPasswordSuccess',
}

export enum SignUpFlowRoute {
  'signUp' = 'signUp',
  'signUp:verifyEmail' = 'signUp:verifyEmail',
  'signUp:veriyPhone' = 'signUp:verifyPhone',
  'signUp:additionalFields' = 'signUp:additionalFields',
  'signUp:success' = 'signUp:success',
}

export enum OrganizationProfileFlowRoute {
  'organizationProfile:members' = 'organizationProfile:members',
  'organizationProfile:invite' = 'organizationProfile:invite',
  'organizationProfile:settings' = 'organizationProfile:settings',
}

export enum UserProfileFlowRoute {
  'userProfile:settings' = 'userProfile:settings',
  'userProfile:security' = 'userProfile:security',
  'userProfile:sessions' = 'userProfile:sessions',
  'userProfile:emails' = 'userProfile:emails',
  'userProfile:phones' = 'userProfile:phones',
  'userProfile:connections' = 'userProfile:connections',
}

export interface ProtocolAuthFlowContextState {
  signIn: {
    route: SignInFlowRoute;
    params: Record<string, string>;
    setRoute: (route: SignInFlowRoute, params?: Record<string, string>) => void;
  };

  signUp: {
    route: SignUpFlowRoute;
    params: Record<string, string>;
    setRoute: (route: SignUpFlowRoute, params?: Record<string, string>) => void;
  };

  organizationProfile: {
    route: OrganizationProfileFlowRoute;
    params: Record<string, string>;
    setRoute: (
      route: OrganizationProfileFlowRoute,
      params?: Record<string, string>,
    ) => void;
  };

  userProfile: {
    route: UserProfileFlowRoute;
    params: Record<string, string>;
    setRoute: (
      route: UserProfileFlowRoute,
      params?: Record<string, string>,
    ) => void;
  };
}

const initialState: ProtocolAuthFlowContextState = {
  signIn: {
    route: SignInFlowRoute.signIn,
    params: {},
    setRoute: (route: SignInFlowRoute, params?: Record<string, string>) => {
      throw new Error('Not implemented' + route.toString());
    },
  },

  signUp: {
    route: SignUpFlowRoute.signUp,
    params: {},
    setRoute: (route: SignUpFlowRoute, params?: Record<string, string>) => {
      throw new Error('Not implemented' + route.toString());
    },
  },

  organizationProfile: {
    route: OrganizationProfileFlowRoute['organizationProfile:members'],
    params: {},
    setRoute: (
      route: OrganizationProfileFlowRoute,
      params?: Record<string, string>,
    ) => {
      throw new Error('Not implemented' + route.toString());
    },
  },

  userProfile: {
    route: UserProfileFlowRoute['userProfile:settings'],
    params: {},
    setRoute: (
      route: UserProfileFlowRoute,
      params?: Record<string, string>,
    ) => {
      throw new Error('Not implemented' + route.toString());
    },
  },
};

export const ProtocolAuthFlowContext =
  React.createContext<ProtocolAuthFlowContextState>({ ...initialState });

export const ProtocolAuthFlowProvider = ({
  children,
  routeState,
}: {
  children?: React.ReactNode;
  routeState: ProtocolAuthFlowContextState;
}) => {
  return (
    <ProtocolAuthFlowContext.Provider
      value={{
        ...routeState,
      }}
    >
      {children}
    </ProtocolAuthFlowContext.Provider>
  );
};

export const useProtocolAuthFlow = () => {
  const ctx = React.useContext(ProtocolAuthFlowContext);

  if (!ctx) {
    throw new Error(
      'useProtocolAuthFlow must be used within a ProtocolAuthFlowProvider',
    );
  }

  return ctx;
};

export const useProtocolAuthSignInFlow = () => {
  const ctx = React.useContext(ProtocolAuthFlowContext);

  if (!ctx) {
    throw new Error(
      'useProtocolAuthSignInFlow must be used within a ProtocolAuthFlowProvider',
    );
  }

  return ctx.signIn;
};

export const useProtocolAuthSignUpFlow = () => {
  const ctx = React.useContext(ProtocolAuthFlowContext);

  if (!ctx) {
    throw new Error(
      'useProtocolAuthSignUpFlow must be used within a ProtocolAuthFlowProvider',
    );
  }

  return ctx.signUp;
};

export const useProtocolAuthOrganizationProfileFlow = () => {
  const ctx = React.useContext(ProtocolAuthFlowContext);

  if (!ctx) {
    throw new Error(
      'useProtocolAuthOrganizationProfileFlow must be used within a ProtocolAuthFlowProvider',
    );
  }

  return ctx.organizationProfile;
};

export const useProtocolAuthUserProfileFlow = () => {
  const ctx = React.useContext(ProtocolAuthFlowContext);

  if (!ctx) {
    throw new Error(
      'useProtocolAuthUserProfileFlow must be used within a ProtocolAuthFlowProvider',
    );
  }

  return ctx.userProfile;
};
