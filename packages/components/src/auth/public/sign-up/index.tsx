import { FrontendCreateSignUpAttempt201Response } from '@protoxyz/core';
import {
  SignUpFlowRoute,
  useProtocolAuthSignUpFlow,
  setSessionCookie,
} from '@protoxyz/auth/client';
import { SignUpRoute } from './routes/signUp';
import { SignUpSuccessRoute } from './routes/success';
import { SignUpVerifyEmailRoute } from './routes/verifyEmail';
import { SignUpVerifyPhoneRoute } from './routes/verifyPhone';
import { SignUpAdditionalFieldsRoute } from './routes/additionalFields';
import {
  AuthSignUpAttemptStatus,
  ResponseStatus,
  SignUpAttempt,
  Tenant,
} from '@protoxyz/types';

import React from 'react';
import { IsLoaded } from '../control/is-loaded';

interface SignUpOptions {
  afterSignUpRedirectUri?: string;
}
export function SignUp({ afterSignUpRedirectUri }: SignUpOptions) {
  const { route } = useProtocolAuthSignUpFlow();

  return (
    <IsLoaded>
      {route === SignUpFlowRoute.signUp && (
        <SignUpRoute afterSignUpRedirectUri={afterSignUpRedirectUri} />
      )}

      {route === SignUpFlowRoute['signUp:additionalFields'] && (
        <SignUpAdditionalFieldsRoute />
      )}

      {route === SignUpFlowRoute['signUp:verifyEmail'] && (
        <SignUpVerifyEmailRoute />
      )}

      {route === SignUpFlowRoute['signUp:verifyPhone'] && (
        <SignUpVerifyPhoneRoute />
      )}

      {route === SignUpFlowRoute['signUp:success'] && <SignUpSuccessRoute />}
    </IsLoaded>
  );
}

export function handleSignUpResponse(
  response: FrontendCreateSignUpAttempt201Response | null | undefined,
  tenant: Tenant,
  setSignUp: (signUp: SignUpAttempt) => void,
  setRoute: (route: SignUpFlowRoute) => void,
  setCreateSignUpError: (error: string) => void,
  navigate: ((uri: string) => void) | null | undefined,
  setToken: (token: string) => void,
) {
  if (response?.status === ResponseStatus.Success) {
    if (response.data?.signUpAttempt) {
      setSignUp(response?.data?.signUpAttempt);
      switch (response?.data?.signUpAttempt.status) {
        case AuthSignUpAttemptStatus.missing_requirements: {
          setRoute(SignUpFlowRoute['signUp:additionalFields']);
          break;
        }
        case AuthSignUpAttemptStatus.needs_verification: {
          if (
            response.data?.signUpAttempt.missingVerifications.includes('email')
          ) {
            setRoute(SignUpFlowRoute['signUp:verifyEmail']);
          } else if (
            response.data?.signUpAttempt.missingVerifications.includes('phone')
          ) {
            setRoute(SignUpFlowRoute['signUp:verifyPhone']);
          }
          break;
        }
        case AuthSignUpAttemptStatus.complete: {
          if (response.data?.jwt) {
            setSessionCookie(response.data?.jwt, tenant);
            setToken(response.data?.jwt);
          }
          setRoute(SignUpFlowRoute['signUp:success']);
          navigate?.(response.data?.signUpAttempt?.redirectUri ?? '');
          break;
        }
      }
    }
  } else {
    setCreateSignUpError(response?.error ?? 'Unknown error');
  }
}
