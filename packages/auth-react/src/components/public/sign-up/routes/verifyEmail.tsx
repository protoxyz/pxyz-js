import { AuthComponentType } from '@protoxyz/themes';
import { CardWrapper } from '../../../custom-ui/card-wrapper';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../ui/card';
import {
  useProtocolAuth,
  useProtocolAuthAppearance,
} from '../../../../contexts/protocol-context';
import { useBrandName } from '../../../../hooks/useBrand';
import { useProtocolAuthClient } from '../../../../contexts/client-context';
import { ResponseStatus, AuthVerificationStrategy } from '@protoxyz/types';
import { BrandLogo, BrandLogoWrapper } from '../../../custom-ui/brand-logo';
import {
  SignUpFlowRoute,
  useProtocolAuthSignUpFlow,
} from '../../../../contexts/flow-context';
import { useState } from 'react';
import { Button } from '../../../ui/button';
import { Spinner } from '../../../ui/spinner';
import { VerifySignupCodeForm } from '../../../custom-ui/verify-code-form';
import { handleSignUpResponse } from '..';

export function SignUpVerifyEmailRoute() {
  const component: AuthComponentType = 'signUp';
  const { protocol, navigate } = useProtocolAuth();
  const { signUp, setSignUp } = useProtocolAuthClient();
  const { setRoute } = useProtocolAuthSignUpFlow();
  const { appearance } = useProtocolAuthAppearance({ component });
  const brandName = useBrandName({ component });
  const [codeSending, setCodeSending] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [error, setError] = useState<string>('');

  const reset = () => {
    setRoute(SignUpFlowRoute.signUp);
    setSignUp(null);
    setError('');
  };

  const onSubmit = async (code: string) => {
    const verifyResponse =
      await protocol.auth.signUpAttempts.attemptVerification({
        path: {
          id: signUp.id,
        },
        body: {
          strategy: AuthVerificationStrategy.email_code,
          code,
        },
      });

    handleSignUpResponse(
      verifyResponse,
      setSignUp,
      setRoute,
      setError,
      navigate,
    );
  };

  const prepareVerification = async () => {
    setCodeSending(true);
    setCodeSent(false);
    const resendResponse =
      await protocol.auth.signUpAttempts.prepareVerification({
        path: {
          id: signUp.id,
        },
        body: {
          strategy: AuthVerificationStrategy.email_code,
        },
      });

    if (resendResponse.status === ResponseStatus.Success) {
      setSignUp(resendResponse.data?.signUpAttempt);
      setCodeSent(true);
      setError('');
    } else {
      console.log(resendResponse);
      setError(resendResponse.error);
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
            <Button onClick={prepareVerification} disabled={codeSending}>
              {codeSending && <Spinner />}
              {!codeSending && `Email code to ${signUp.email}`}
            </Button>
          )}

          {codeSent && (
            <VerifySignupCodeForm
              identifier={signUp.email}
              onSubmit={onSubmit}
              setError={setError}
            />
          )}

          {error && <div className="text-sm text-red-500">{error}</div>}

          {codeSent && (
            <div className="text-sm text-green-500">
              Verification code sent to {signUp.email}
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
