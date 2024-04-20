import { AuthComponentType } from '@protoxyz/themes';
import { CardWrapper } from '../../../custom-ui/card-wrapper';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../../ui/card';
import {
  useProtocolAuth,
  useProtocolAuthAppearance,
  useProtocolAuthClient,
  useProtocolAuthSignUpFlow,
  useBrandName,
  SignUpFlowRoute,
} from '@protoxyz/auth-react';

import { ResponseStatus, AuthVerificationStrategy } from '@protoxyz/types';
import { BrandLogo, BrandLogoWrapper } from '../../../custom-ui/brand-logo';
import React from 'react';
import { Button, LoadingButton } from '../../../../ui/button';
import { VerifySignupCodeForm } from '../../../custom-ui/verify-code-form';
import { handleSignUpResponse } from '..';

export function SignUpVerifyEmailRoute() {
  const component: AuthComponentType = 'signUp';
  const { protocol, navigate, tenant, setToken } = useProtocolAuth();
  const { signUp, setSignUp } = useProtocolAuthClient();
  const { setRoute } = useProtocolAuthSignUpFlow();
  const { appearance } = useProtocolAuthAppearance({ component });
  const brandName = useBrandName({ component });
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
            strategy: AuthVerificationStrategy.email_code,
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
            strategy: AuthVerificationStrategy.email_code,
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
      setError(resendResponse?.error ?? 'Could not send verification code');
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
            Email Verification
          </CardTitle>
          <CardDescription
            className={appearance?.elements?.cardHeaderDescription}
          >
            We need to verify your email address to complete sign up.
          </CardDescription>
        </CardHeader>

        <CardContent className={appearance?.elements?.cardContent}>
          {!codeSent && (
            <LoadingButton
              loading={codeSending}
              onClick={prepareVerification}
              disabled={codeSending}
            >
              Email code to {signUp?.email}
            </LoadingButton>
          )}

          {codeSent && signUp?.email && (
            <VerifySignupCodeForm
              identifier={signUp?.email}
              onSubmit={onSubmit}
              setError={setError}
            />
          )}

          {error && <div className="text-sm text-red-500">{error}</div>}

          {codeSent && (
            <div className="text-sm text-green-500">
              Verification code sent to {signUp?.email}
            </div>
          )}

          <div className="flex flex-col gap-y-0">
            {codeSent && (
              <LoadingButton
                variant="link"
                onClick={codeSending ? undefined : prepareVerification}
                className="justify-start"
                disabled={codeSending}
                loading={codeSending}
              >
                Resend code
              </LoadingButton>
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
