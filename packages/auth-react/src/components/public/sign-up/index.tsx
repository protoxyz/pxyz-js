import { CreateSignUpAttempt201Response } from '@protoxyz/core';
import {
  SignUpFlowRoute,
  useProtocolAuthSignUpFlow,
} from '../../../contexts/flow-context';
import { SignUpRoute } from './routes/signUp';
import { SignUpSuccessRoute } from './routes/success';
import { SignUpVerifyEmailRoute } from './routes/verifyEmail';
import { SignUpVerifyPhoneRoute } from './routes/verifyPhone';
import { SignUpAdditionalFieldsRoute } from './routes/additionalFields';
import {
  AuthSignUpAttemptStatus,
  ResponseStatus,
  SignUpAttempt,
} from '@protoxyz/types';

interface SignUpOptions {
  afterSignUpRedirectUri?: string;
}
export function SignUp({ afterSignUpRedirectUri }: SignUpOptions) {
  const { route } = useProtocolAuthSignUpFlow();

  return (
    <>
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
    </>
  );
}

export function handleSignUpResponse(
  response: CreateSignUpAttempt201Response,
  setSignUp: (signUp: SignUpAttempt) => void,
  setRoute: (route: SignUpFlowRoute) => void,
  setCreateSignUpError: (error: string) => void,
  navigate: (uri: string) => void,
) {
  if (response.status === ResponseStatus.Success) {
    setSignUp(response.data.signUpAttempt);
    switch (response.data.signUpAttempt.status) {
      case AuthSignUpAttemptStatus.missing_requirements: {
        setRoute(SignUpFlowRoute['signUp:additionalFields']);
        break;
      }
      case AuthSignUpAttemptStatus.needs_verification: {
        if (
          response.data.signUpAttempt.missingVerifications.includes('email')
        ) {
          setRoute(SignUpFlowRoute['signUp:verifyEmail']);
        } else if (
          response.data.signUpAttempt.missingVerifications.includes('phone')
        ) {
          setRoute(SignUpFlowRoute['signUp:verifyPhone']);
        }
        break;
      }
      case AuthSignUpAttemptStatus.complete: {
        setRoute(SignUpFlowRoute['signUp:success']);
        navigate(response.data.signUpAttempt.redirectUri);
        break;
      }
    }
  } else {
    setCreateSignUpError(response.error);
  }
}
