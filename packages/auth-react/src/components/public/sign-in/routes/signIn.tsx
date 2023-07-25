import { zodResolver } from '@hookform/resolvers/zod';
import {
  ResponseStatus,
  AllowedIdentifierType,
  Tenant,
  AuthSignInAttemptStatus,
  AuthVerificationStrategy,
} from '@protoxyz/types';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../custom-ui/form';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { z } from 'zod';
import { AuthComponentType } from '@protoxyz/themes';
import {
  useProtocolAuth,
  useProtocolAuthAppearance,
  useProtocolAuthTenant,
} from '../../../../contexts/protocol-context';
import { useBrandName } from '../../../../hooks/useBrand';
import { CardWrapper } from '../../../custom-ui/card-wrapper';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../ui/card';
import { BrandLogo, BrandLogoWrapper } from '../../../custom-ui/brand-logo';
import { SocialLinks } from '../../../custom-ui/social-links';
import { Divider } from '../../../custom-ui/divider';
import { FooterLinks } from '../../../custom-ui/footer-links';
import { CardFooterLinks } from '../../../custom-ui/card-footer-links';
import {
  SignInFlowRoute,
  useProtocolAuthSignInFlow,
} from '../../../../contexts/flow-context';
import { useProtocolAuthClient } from '../../../../contexts/client-context';
import { CreateSignInAttempt201Response } from '@protoxyz/core';
import { Spinner } from '../../../ui/spinner';

const EmailAddressFormSchema = z.object({
  emailAddress: z.string().email(),
  password: z.string().optional(),
});
const PhoneNumberFormSchema = z.object({
  phoneNumber: z.string().min(8),
  password: z.string().optional(),
});
const UsernameFormSchema = z.object({
  username: z.string().min(4),
  password: z.string().optional(),
});

export function SignInIdentifierForm({
  tenant,
  firstFactorIdentifierType,
  setFirstFactorIdentifierType,
  afterSignInRedirectUri,
}: {
  tenant: Tenant;
  firstFactorIdentifierType: AllowedIdentifierType | null;
  setFirstFactorIdentifierType: (type: AllowedIdentifierType) => void;
  afterSignInRedirectUri?: string;
}) {
  const { setRoute } = useProtocolAuthSignInFlow();
  const { protocol } = useProtocolAuth();
  const { setSignIn } = useProtocolAuthClient();
  const usingPasswords = tenant?.auth?.passwordsEnabled;
  const [creatingSignIn, setCreatingSignIn] = useState(false);
  const [createSignInError, setCreateSignInError] = useState<string>('');

  const formSchema = useMemo(() => {
    switch (firstFactorIdentifierType) {
      case 'emailAddress': {
        return EmailAddressFormSchema;
      }
      case 'phoneNumber': {
        return PhoneNumberFormSchema;
      }
      case 'username': {
        return UsernameFormSchema;
      }

      default: {
        return null;
      }
    }
  }, [firstFactorIdentifierType]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailAddress: '',
      phoneNumber: '',
      username: '',
      password: '',
    },
  });

  function handleResponse(response: CreateSignInAttempt201Response) {
    if (response.status === ResponseStatus.Success) {
      setSignIn(response.data.signInAttempt);
      switch (response.data.signInAttempt.status) {
        case AuthSignInAttemptStatus.needs_factor_one: {
          setRoute(SignInFlowRoute['signIn:verifyFirstFactor']);
          break;
        }
        case AuthSignInAttemptStatus.needs_factor_two: {
          setRoute(SignInFlowRoute['signIn:verifySecondFactor']);
          break;
        }
        case AuthSignInAttemptStatus.complete: {
          setRoute(SignInFlowRoute['signIn:complete']);
          break;
        }
      }
    } else {
      setCreateSignInError(response.error);
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (creatingSignIn) {
      return;
    }
    setCreatingSignIn(true);

    switch (firstFactorIdentifierType) {
      case 'emailAddress':
        {
          const strategyValues = values as z.infer<
            typeof EmailAddressFormSchema
          >;

          handleResponse(
            await protocol.auth.signInAttempts.create({
              body: {
                redirectUri: afterSignInRedirectUri ?? window.location.origin,
                strategy: AuthVerificationStrategy.email_code,
                identifier: strategyValues.emailAddress,
                password: strategyValues.password,
              },
            }),
          );
        }
        break;

      case 'phoneNumber': {
        const strategyValues = values as z.infer<typeof PhoneNumberFormSchema>;

        handleResponse(
          await protocol.auth.signInAttempts.create({
            body: {
              redirectUri: afterSignInRedirectUri ?? window.location.origin,
              strategy: AuthVerificationStrategy.phone_code,
              identifier: strategyValues.phoneNumber,
              password: strategyValues.password,
            },
          }),
        );
        break;
      }
    }

    setCreatingSignIn(false);

    // setRoute(SignInFlowRoute["signIn:verifyFirstFactor"]);
  }

  function onInvalid(errors: any) {
    console.log(errors);
  }

  // const signInsEnabled = useMemo(() => {
  //     return {
  //         email: tenant?.allowedIdentifierTypes.includes("emailAddress"),
  //         phone: tenant?.allowedIdentifierTypes.includes("phoneNumber"),
  //         username: tenant?.allowedIdentifierTypes.includes("username"),
  //     };
  // }, [tenant]);

  const alternativeUsernameSignInsEnabled = useMemo(() => {
    return {
      email: tenant?.auth?.emailSignInEnabled,
      phone: tenant?.auth?.phoneSignInEnabled,
    };
  }, [tenant]);

  const alternativeEmailSignInsEnabled = useMemo(() => {
    return {
      username: tenant?.auth?.usernameSignInEnabled,
      phone: tenant?.auth?.phoneSignInEnabled,
    };
  }, [tenant]);

  const alternativePhoneSignInsEnabled = useMemo(() => {
    return {
      username: tenant?.auth?.usernameSignInEnabled,
      email: tenant?.auth?.emailSignInEnabled,
    };
  }, [tenant]);

  if (!firstFactorIdentifierType) {
    return null;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onInvalid)}
        className="space-y-8"
      >
        {firstFactorIdentifierType === 'username' && (
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Username</FormLabel>

                  <div className="flex items-center gap-1">
                    {alternativeUsernameSignInsEnabled.email && (
                      <Button
                        type="button"
                        onClick={() =>
                          setFirstFactorIdentifierType('emailAddress')
                        }
                        variant="link"
                        color="primary"
                        size="sm"
                      >
                        use email
                      </Button>
                    )}

                    {alternativeUsernameSignInsEnabled.phone && (
                      <Button
                        type="button"
                        onClick={() =>
                          setFirstFactorIdentifierType('phoneNumber')
                        }
                        variant="link"
                        color="primary"
                        size="sm"
                      >
                        use phone
                      </Button>
                    )}
                  </div>
                </div>
                <FormControl>
                  <Input name="username" placeholder="myusername" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {firstFactorIdentifierType === 'emailAddress' && (
          <FormField
            control={form.control}
            name="emailAddress"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Email address</FormLabel>
                  <div className="flex items-center gap-1">
                    {alternativeEmailSignInsEnabled.phone && (
                      <Button
                        type="button"
                        onClick={() =>
                          setFirstFactorIdentifierType('phoneNumber')
                        }
                        variant="link"
                        color="primary"
                        size="sm"
                      >
                        use phone
                      </Button>
                    )}
                    {alternativeEmailSignInsEnabled.username && (
                      <Button
                        type="button"
                        onClick={() => setFirstFactorIdentifierType('username')}
                        variant="link"
                        color="primary"
                        size="sm"
                      >
                        use username
                      </Button>
                    )}
                  </div>
                </div>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {firstFactorIdentifierType === 'phoneNumber' && (
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Phone number
                  <div className="flex items-center gap-1">
                    {alternativePhoneSignInsEnabled.email && (
                      <Button
                        type="button"
                        onClick={() =>
                          setFirstFactorIdentifierType('emailAddress')
                        }
                        variant="link"
                        color="primary"
                        size="sm"
                      >
                        use email
                      </Button>
                    )}
                    {alternativePhoneSignInsEnabled.username && (
                      <Button
                        type="button"
                        onClick={() => setFirstFactorIdentifierType('username')}
                        variant="link"
                        color="primary"
                        size="sm"
                      >
                        use username
                      </Button>
                    )}
                  </div>
                </FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="555-555-5555" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {usingPasswords && (
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="*****************"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {createSignInError && <FormMessage>{createSignInError}</FormMessage>}

        <Button
          type="submit"
          variant="default"
          className="w-full uppercase"
          disabled={creatingSignIn}
        >
          {creatingSignIn && <Spinner color="white" />}
          {!creatingSignIn && 'Continue'}
        </Button>
      </form>
    </Form>
  );
}

interface SignInRouteOptions {
  afterSignInRedirectUri?: string;
}
export function SignInRoute({ afterSignInRedirectUri }: SignInRouteOptions) {
  const component: AuthComponentType = 'signIn';
  const { appearance } = useProtocolAuthAppearance({ component });
  const { tenant } = useProtocolAuthTenant();
  const brandName = useBrandName({ component });
  const usingPasswords = tenant?.auth?.passwordsEnabled;

  const initialFirstFactorIdentifierType = useMemo(() => {
    if (tenant?.auth?.emailSignInEnabled) {
      return 'emailAddress';
    } else if (tenant?.auth?.phoneSignInEnabled) {
      return 'phoneNumber';
    } else if (tenant?.auth?.usernameSignInEnabled) {
      return 'username';
    } else {
      return null;
    }
  }, [tenant]);

  const [firstFactorIdentifierType, setFirstFactorIdentifierType] =
    useState<AllowedIdentifierType | null>(initialFirstFactorIdentifierType);

  return (
    <CardWrapper
      component={component}
      className={appearance?.elements?.cardWrapper}
    >
      <Card className={appearance?.elements?.card}>
        <CardHeader className={appearance?.elements?.cardHeader}>
          <BrandLogoWrapper>
            <BrandLogo component={component} />
          </BrandLogoWrapper>
          <CardTitle className={appearance?.elements?.cardHeaderTitle}>
            Welcome back!
          </CardTitle>
          <CardDescription
            className={appearance?.elements?.cardHeaderDescription}
          >
            Log in to {brandName} to continue
          </CardDescription>
        </CardHeader>
        <CardContent className={appearance?.elements?.cardContent}>
          <SocialLinks appearance={appearance} tenant={tenant} />

          <Divider />

          <SignInIdentifierForm
            tenant={tenant}
            afterSignInRedirectUri={afterSignInRedirectUri}
            firstFactorIdentifierType={firstFactorIdentifierType}
            setFirstFactorIdentifierType={setFirstFactorIdentifierType}
          />
        </CardContent>
        <CardFooter className={appearance?.elements?.cardFooter}>
          <FooterLinks
            appearance={appearance}
            tenant={tenant}
            usingPasswords={usingPasswords}
            component={component}
          />
        </CardFooter>
      </Card>
      <CardFooterLinks component={component} />
    </CardWrapper>
  );
}
