import React from 'react';
import { AuthComponentType } from '@protoxyz/themes';
import { ResponseStatus, AuthVerificationStrategy } from '@protoxyz/types';

import { CardWrapper } from '../../../custom-ui/card-wrapper';
import { BrandLogo, BrandLogoWrapper } from '../../../custom-ui/brand-logo';
import { VerifySignupCodeForm } from '../../../custom-ui/verify-code-form';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../../ui/card';
import { Button } from '../../../../ui/button';
import { Spinner } from '../../../../ui/spinner';

import {
  useProtocolAuth,
  useProtocolAuthAppearance,
  useProtocolAuthClient,
  useProtocolAuthSignUpFlow,
  SignUpFlowRoute,
} from '@protoxyz/auth-react';

import { handleSignUpResponse } from '..';

export function SignUpVerifyPhoneRoute() {
  const component: AuthComponentType = 'signUp';
  const { protocol, navigate, tenant, setToken } = useProtocolAuth();
  const { signUp, setSignUp } = useProtocolAuthClient();
  const { setRoute } = useProtocolAuthSignUpFlow();
  const { appearance } = useProtocolAuthAppearance({ component });
  const [codeSending, setCodeSending] = React.useState(false);
  const [codeSent, setCodeSent] = React.useState(false);
  const [error, setError] = React.useState<string>('');

  if (!tenant) {
    return <div>No tenant</div>;
  }

  const reset = () => {
    setRoute(SignUpFlowRoute.signUp);
    setSignUp(null);
    setError('');
  };

  const onSubmit = async (code: string) => {
    const verifyResponse = signUp
      ? await protocol?.auth.signUpAttempts.attemptVerification({
          path: {
            id: signUp.id,
          },
          body: {
            strategy: AuthVerificationStrategy.phone_code,
            code,
          },
        })
      : undefined;

    handleSignUpResponse(
      verifyResponse,
      tenant,
      setSignUp,
      setRoute,
      setError,
      navigate,
      setToken as any,
    );
  };

  const prepareVerification = async () => {
    setCodeSending(true);
    setCodeSent(false);
    const resendResponse = signUp
      ? await protocol?.auth.signUpAttempts.prepareVerification({
          path: {
            id: signUp.id,
          },
          body: {
            strategy: AuthVerificationStrategy.phone_code,
          },
        })
      : undefined;

    if (
      resendResponse?.status === ResponseStatus.Success &&
      resendResponse.data.signUpAttempt
    ) {
      setSignUp(resendResponse.data?.signUpAttempt);
      setCodeSent(true);
      setError('');
    } else {
      console.log(resendResponse);
      setError(resendResponse?.error ?? 'Something went wrong.');
    }

    setCodeSending(false);
  };

  return (
    <CardWrapper
      component={component}
      className={appearance?.elements?.cardWrapper}
    >
      <Card className={appearance?.elements?.card}>
        <CardHeader className={appearance?.elements?.cardHeader}>
          <BrandLogoWrapper component={component}>
            <BrandLogo component={component} />
          </BrandLogoWrapper>
          <CardTitle className={appearance?.elements?.cardHeaderTitle}>
            Phone Verification
          </CardTitle>
          <CardDescription
            className={appearance?.elements?.cardHeaderDescription}
          >
            We need to verify your phone number to complete sign up.
          </CardDescription>
        </CardHeader>

        <CardContent className={appearance?.elements?.cardContent}>
          {!codeSent && (
            <Button onClick={prepareVerification} disabled={codeSending}>
              {codeSending && <Spinner />}
              {!codeSending && `Text code to ${signUp?.phone}`}
            </Button>
          )}

          {codeSent && signUp?.phone && (
            <VerifySignupCodeForm
              identifier={signUp.phone}
              onSubmit={onSubmit}
              setError={setError}
            />
          )}

          {error && <div className="text-sm text-red-500">{error}</div>}

          {codeSent && (
            <div className="text-sm text-green-500">
              Verification code sent to {signUp?.phone}
            </div>
          )}

          <div className="flex flex-col gap-y-0">
            {codeSent && (
              <Button
                variant="link"
                onClick={codeSending ? undefined : prepareVerification}
                className="justify-start"
                disabled={codeSending}
              >
                {codeSending && <Spinner />}
                {!codeSending && 'Resend code'}
              </Button>
            )}

            <Button variant="link" onClick={reset} className="justify-start">
              Start over
            </Button>
          </div>
        </CardContent>
      </Card>
    </CardWrapper>
  );
}
