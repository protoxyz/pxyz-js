import { FrontendCreateSignInAttempt201Response } from '@protoxyz/core';
import {
  SignInFlowRoute,
  useProtocolAuthSignInFlow,
} from '../../../contexts/flow-context';
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
import { setSessionCookie } from '../../../lib/cookies';

interface SignInOptions {
  afterSignInRedirectUri?: string;
}
export function SignIn({ afterSignInRedirectUri }: SignInOptions) {
  const { route } = useProtocolAuthSignInFlow();

  return (
    <>
      {route === SignInFlowRoute.signIn && (
        <SignInRoute afterSignInRedirectUri={afterSignInRedirectUri} />
      )}
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
    </>
  );
}

export function handleSignInResponse(
  response: FrontendCreateSignInAttempt201Response,
  tenant: Tenant,
  setSignIn: (signIn: SignInAttempt) => void,
  setRoute: (route: SignInFlowRoute) => void,
  setCreateSignInError: (error: string) => void,
  navigate: (uri: string) => void,
) {
  if (response.status === ResponseStatus.Success) {
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
        setSessionCookie(response.data?.jwt, tenant);
        setRoute(SignInFlowRoute['signIn:success']);

        console.log('redirectUri:', response.data?.signInAttempt.redirectUri);
        if (
          response.data?.signInAttempt.redirectUri.startsWith(
            'http://localhost:8085',
          )
        ) {
          const redirectUri = new URL(response.data?.signInAttempt.redirectUri);
          redirectUri.searchParams.append('jwt', response.data?.jwt);
          navigate(redirectUri.toString());
        } else {
          navigate(response.data?.signInAttempt.redirectUri);
        }
        break;
      }
    }
  } else {
    setCreateSignInError(response.error);
  }
}
