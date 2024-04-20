import { FrontendCreateSignInAttempt201Response } from '@protoxyz/api-clients';
import {
  SignInFlowRoute,
  setSessionCookie,
  useProtocolAuthSignInFlow,
} from '@protoxyz/auth-react';
import { SignInForgotPasswordRoute } from './routes/forgotPassword';
import { SignInResetPasswordRoute } from './routes/resetPassword';
import { SignInResetPasswordSuccessRoute } from './routes/resetPasswordSuccess';
import { SignInRoute } from './routes/signIn';
import { SignInSuccessRoute } from './routes/success';
import { SignInVerifyFirstFactorRoute } from './routes/verifyFirstFactor';
import { SignInVerifySecondFactorRoute } from './routes/verifySecondFactor';
import {
  AuthSignInAttemptStatus,
  ResponseStatus,
  SignInAttempt,
  Tenant,
} from '@protoxyz/types';
import { SignInMethodsRoute } from './routes/methods';
import React from 'react';
import { IsLoaded } from '../control/is-loaded';

interface SignInOptions {
  afterSignInRedirectUri?: string;
}

export function SignIn({ afterSignInRedirectUri }: SignInOptions) {
  const { route } = useProtocolAuthSignInFlow();

  return (
    <IsLoaded>
      {route === SignInFlowRoute.signIn && (
        <SignInRoute afterSignInRedirectUri={afterSignInRedirectUri} />
      )}
      {route === SignInFlowRoute['signIn:methods'] && <SignInMethodsRoute />}
      {route === SignInFlowRoute['signIn:verifyFirstFactor'] && (
        <SignInVerifyFirstFactorRoute />
      )}
      {route === SignInFlowRoute['signIn:verifySecondFactor'] && (
        <SignInVerifySecondFactorRoute />
      )}
      {route === SignInFlowRoute['signIn:success'] && <SignInSuccessRoute />}

      {route === SignInFlowRoute['signIn:forgotPassword'] && (
        <SignInForgotPasswordRoute />
      )}
      {route === SignInFlowRoute['signIn:resetPassword'] && (
        <SignInResetPasswordRoute />
      )}
      {route === SignInFlowRoute['signIn:resetPasswordSuccess'] && (
        <SignInResetPasswordSuccessRoute />
      )}
    </IsLoaded>
  );
}

export function handleSignInResponse(
  response: FrontendCreateSignInAttempt201Response | null | undefined,
  tenant: Tenant | null | undefined,
  setSignIn: (signIn: SignInAttempt) => void,
  setRoute: (route: SignInFlowRoute) => void,
  setCreateSignInError: (error: string) => void,
  navigate: ((uri: string) => void) | null | undefined,
  setToken: (token: string) => void,
) {
  if (response?.status === ResponseStatus.Success) {
    if (response.data?.signInAttempt) {
      setSignIn(response.data?.signInAttempt);
      switch (response.data?.signInAttempt.status) {
        case AuthSignInAttemptStatus.needs_factor_one: {
          setRoute(SignInFlowRoute['signIn:verifyFirstFactor']);
          break;
        }
        case AuthSignInAttemptStatus.needs_factor_two: {
          setRoute(SignInFlowRoute['signIn:verifySecondFactor']);
          break;
        }
        case AuthSignInAttemptStatus.complete: {
          if (response.data?.jwt) {
            setSessionCookie(response.data?.jwt, tenant);
            setToken(response.data?.jwt);
          }
          setRoute(SignInFlowRoute['signIn:success']);

          navigate?.(response.data?.signInAttempt.redirectUri ?? '/');
          break;
        }
      }
    }
  } else {
    setCreateSignInError(response?.error ?? 'Unknown error');
  }
}
