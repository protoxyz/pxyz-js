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
import {
  ResponseStatus,
  AuthSignInAttemptStatus,
  AuthVerificationStrategy,
} from '@protoxyz/types';
import { BrandLogo, BrandLogoWrapper } from '../../../custom-ui/brand-logo';
import {
  SignInFlowRoute,
  useProtocolAuthSignInFlow,
} from '../../../../contexts/flow-context';
import { z } from 'zod';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField } from '../../../custom-ui/form';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { cn } from '../../../../lib/utils';
import { Spinner } from '../../../ui/spinner';
import { handleSignInResponse } from '..';

export function SignInVerifyFirstFactorRoute() {
  const component: AuthComponentType = 'signIn';
  const { protocol } = useProtocolAuth();
  const { signIn, setSignIn } = useProtocolAuthClient();
  const { setRoute } = useProtocolAuthSignInFlow();
  const { appearance } = useProtocolAuthAppearance({ component });
  const brandName = useBrandName({ component });
  const [codeResending, setCodeResending] = useState(false);
  const [codeResent, setCodeResent] = useState(false);
  const [error, setError] = useState<string>('');

  const reset = () => {
    setRoute(SignInFlowRoute.signIn);
    setSignIn(null);
    setError('');
  };

  const resendCode = async () => {
    setCodeResending(true);
    setCodeResent(false);
    const resendResponse =
      await protocol.auth.signInAttempts.prepareFirstFactor({
        path: {
          id: signIn.id,
        },
        body: {
          strategy: signIn.strategy,
          identifier: signIn.identifier,
        },
      });

    if (resendResponse.status === ResponseStatus.Success) {
      setSignIn(resendResponse.data.signInAttempt);
      setCodeResent(true);
      setError('');
    } else {
      console.log(resendResponse);
      setError(resendResponse.error);
    }

    setCodeResending(false);
  };

  return (
    <CardWrapper
      component={component}
      className={appearance?.elements?.cardWrapper}
    >
      <Card className={appearance?.elements?.card}>
        {signIn.strategy === AuthVerificationStrategy.email_code && (
          <CardHeader className={appearance?.elements?.cardHeader}>
            {appearance?.layout?.headerPlacement !== 'none' && (
              <>
                <BrandLogoWrapper component={component}>
                  <BrandLogo component={component} />
                </BrandLogoWrapper>
                <CardTitle className={appearance?.elements?.cardHeaderTitle}>
                  Check your email
                </CardTitle>
                <CardDescription
                  className={appearance?.elements?.cardHeaderDescription}
                >
                  we've emailed a verification code to {signIn.identifier}
                </CardDescription>
              </>
            )}
          </CardHeader>
        )}

        {signIn.strategy === AuthVerificationStrategy.email_link && (
          <CardHeader className={appearance?.elements?.cardHeader}>
            {appearance?.layout?.headerPlacement !== 'none' && (
              <>
                <BrandLogoWrapper component={component}>
                  <BrandLogo component={component} />
                </BrandLogoWrapper>
                <CardTitle className={appearance?.elements?.cardHeaderTitle}>
                  Check your email
                </CardTitle>
                <CardDescription
                  className={appearance?.elements?.cardHeaderDescription}
                >
                  we've emailed a login link to {signIn.identifier}
                </CardDescription>
              </>
            )}
          </CardHeader>
        )}

        {signIn.strategy === AuthVerificationStrategy.phone_code && (
          <CardHeader className={appearance?.elements?.cardHeader}>
            {appearance?.layout?.headerPlacement !== 'none' && (
              <>
                <BrandLogoWrapper component={component}>
                  <BrandLogo component={component} />
                </BrandLogoWrapper>
                <CardTitle className={appearance?.elements?.cardHeaderTitle}>
                  Check your phone
                </CardTitle>
                <CardDescription
                  className={appearance?.elements?.cardHeaderDescription}
                >
                  we've texted a verification code to {signIn.identifier}
                </CardDescription>
              </>
            )}
          </CardHeader>
        )}

        <CardContent className={appearance?.elements?.cardContent}>
          <Button variant="outline">{signIn.identifier}</Button>

          <SignInVerifyFirstFactorForm setError={setError} />

          {error && <div className="text-sm text-red-500">{error}</div>}

          {codeResent && (
            <div className="text-sm text-green-500">
              Verification code resent to {signIn.identifier}
            </div>
          )}

          <div className="flex flex-col gap-y-0">
            <Button
              variant="link"
              onClick={codeResending ? undefined : resendCode}
              className="justify-start"
              disabled={codeResending}
            >
              {codeResending && <Spinner />}
              {!codeResending && 'Resend code'}
            </Button>

            <Button variant="link" onClick={reset} className="justify-start">
              Use another method
            </Button>
          </div>
        </CardContent>
      </Card>
    </CardWrapper>
  );
}

const VerificationSchema = z.object({
  code_0: z.string(),
  code_1: z.string(),
  code_2: z.string(),
  code_3: z.string(),
  code_4: z.string(),
  code_5: z.string(),
});

export function SignInVerifyFirstFactorForm({
  setError,
}: {
  setError: (error: string) => void;
}) {
  const { setRoute } = useProtocolAuthSignInFlow();
  const { protocol, navigate, tenant } = useProtocolAuth();
  const { signIn, setSignIn } = useProtocolAuthClient();
  const [verifying, setVerifying] = useState(false);

  const formSchema = VerificationSchema;

  const [ref0, ref1, ref2, ref3, ref4, ref5] = [
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
  ];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code_0: '',
      code_1: '',
      code_2: '',
      code_3: '',
      code_4: '',
      code_5: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (verifying) return;
    setVerifying(true);

    const code = [
      values.code_0,
      values.code_1,
      values.code_2,
      values.code_3,
      values.code_4,
      values.code_5,
    ].join('');

    const signInResponse =
      await protocol.auth.signInAttempts.attemptFirstFactor({
        path: {
          id: signIn.id,
        },
        body: {
          strategy: signIn.strategy,
          code,
        },
      });

    handleSignInResponse(
      signInResponse,
      tenant,
      setSignIn,
      setRoute,
      setError,
      navigate,
    );
  }

  function onInvalid(errors: any) {
    console.log(errors);
  }

  function handlePaste(value: string) {
    const split = value.split('');

    for (let i = 0; i < split.length; i++) {
      if (i >= 6) break;

      // make sure it's numeric
      if (isNaN(parseInt(split[i]))) continue;

      if (i === 0) form.setValue('code_0', split[i]);
      if (i === 1) form.setValue('code_1', split[i]);
      if (i === 2) form.setValue('code_2', split[i]);
      if (i === 3) form.setValue('code_3', split[i]);
      if (i === 4) form.setValue('code_4', split[i]);
      if (i === 5) form.setValue('code_5', split[i]);
    }

    if (split.length === 1) {
      if (ref1 && ref1.current && ref1.current) (ref1.current as any).focus();
    } else if (split.length === 2) {
      if (ref2 && ref2.current && ref2.current) (ref2.current as any).focus();
    } else if (split.length === 3) {
      if (ref3 && ref3.current && ref3.current) (ref3.current as any).focus();
    } else if (split.length === 4) {
      if (ref4 && ref4.current && ref4.current) (ref4.current as any).focus();
    } else if (split.length === 5) {
      if (ref5 && ref5.current && ref5.current) (ref5.current as any).focus();
    }

    if (split.length === 6) {
      onSubmit({
        code_0: split[0],
        code_1: split[1],
        code_2: split[2],
        code_3: split[3],
        code_4: split[4],
        code_5: split[5],
      });
    }
  }

  function handleCodeFieldChange(
    e: React.ChangeEvent<HTMLInputElement>,
    field: any,
    nextRef: React.MutableRefObject<HTMLInputElement> | null,
  ) {
    if (e.target.value.length === 1) {
      // make sure it's numeric
      if (!/^\d+$/.test(e.target.value)) {
        field.onChange('');
        return;
      }
      field.onChange(e.target.value.split('')[0]);

      if (nextRef) {
        nextRef?.current?.focus();
        nextRef?.current?.select();
      } else {
        onSubmit(form.getValues());
      }
    } else if (e.target.value.length > 1) {
      handlePaste(e.target.value);
    } else {
      field.onChange(e.target.value.split('')[0]);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onInvalid)}
        className="space-y-8"
      >
        <div className="flex gap-3">
          <FormField
            name={'code_0'}
            control={form.control}
            render={({ field }) => (
              <FormControl>
                <Input
                  id="code_0"
                  autoFocus={true}
                  autoComplete="one-time-code"
                  autoCorrect="off"
                  className={cn(
                    'ring-none focus:ring-none select-none appearance-none rounded-none border-b-2 border-l-0 border-r-0 border-t-0 text-center focus:border-0',
                  )}
                  {...field}
                  ref={ref0}
                  onChange={(e) => handleCodeFieldChange(e, field, ref1)}
                />
              </FormControl>
            )}
          />

          <FormField
            name={'code_1'}
            control={form.control}
            render={({ field }) => (
              <FormControl>
                <Input
                  id="code_1"
                  autoComplete="one-time-code"
                  autoCorrect="off"
                  className={cn(
                    'ring-none focus:ring-none select-none appearance-none rounded-none border-b-2 border-l-0 border-r-0 border-t-0 text-center focus:border-0',
                  )}
                  {...field}
                  ref={ref1}
                  onChange={(e) => handleCodeFieldChange(e, field, ref2)}
                />
              </FormControl>
            )}
          />

          <FormField
            name={'code_2'}
            control={form.control}
            render={({ field }) => (
              <FormControl>
                <Input
                  id="code_2"
                  autoComplete="one-time-code"
                  autoCorrect="off"
                  className={cn(
                    'ring-none focus:ring-none select-none appearance-none rounded-none border-b-2 border-l-0 border-r-0 border-t-0 text-center focus:border-0',
                  )}
                  {...field}
                  ref={ref2}
                  onChange={(e) => handleCodeFieldChange(e, field, ref3)}
                />
              </FormControl>
            )}
          />

          <FormField
            name={'code_3'}
            control={form.control}
            render={({ field }) => (
              <FormControl>
                <Input
                  id="code_3"
                  autoComplete="one-time-code"
                  autoCorrect="off"
                  className={cn(
                    'ring-none focus:ring-none select-none appearance-none rounded-none border-b-2 border-l-0 border-r-0 border-t-0 text-center focus:border-0',
                  )}
                  {...field}
                  ref={ref3}
                  onChange={(e) => handleCodeFieldChange(e, field, ref4)}
                />
              </FormControl>
            )}
          />

          <FormField
            name={'code_4'}
            control={form.control}
            render={({ field }) => (
              <FormControl>
                <Input
                  id="code_4"
                  autoComplete="one-time-code"
                  autoCorrect="off"
                  className={cn(
                    'ring-none focus:ring-none select-none appearance-none rounded-none border-b-2 border-l-0 border-r-0 border-t-0 text-center focus:border-0',
                  )}
                  {...field}
                  ref={ref4}
                  onChange={(e) => handleCodeFieldChange(e, field, ref5)}
                />
              </FormControl>
            )}
          />

          <FormField
            name={'code_5'}
            control={form.control}
            render={({ field }) => (
              <FormControl>
                <Input
                  id="code_5"
                  autoComplete="one-time-code"
                  autoCorrect="off"
                  className={cn(
                    'ring-none focus:ring-none select-none appearance-none rounded-none border-b-2 border-l-0 border-r-0 border-t-0 text-center focus:border-0',
                  )}
                  {...field}
                  ref={ref5}
                  onChange={(e) => handleCodeFieldChange(e, field, null)}
                />
              </FormControl>
            )}
          />
        </div>

        <Button type="submit" variant="default" className="w-full uppercase">
          {verifying && <Spinner color="white" />}
          {!verifying && 'Continue'}
        </Button>
      </form>
    </Form>
  );
}
