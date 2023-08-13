import { zodResolver } from '@hookform/resolvers/zod';
import { Tenant } from '@protoxyz/types';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
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
import { useBrandLogo, useBrandName } from '../../../../hooks/useBrand';
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
import { FooterLinks } from '../../../custom-ui/footer-links';
import { CardFooterLinks } from '../../../custom-ui/card-footer-links';
import { useProtocolAuthSignUpFlow } from '../../../../contexts/flow-context';
import { useProtocolAuthClient } from '../../../../contexts/client-context';
import { Spinner } from '../../../ui/spinner';
import { handleSignUpResponse } from '..';

export function SignUpForm({
  tenant,
  afterSignUpRedirectUri,
}: {
  tenant: Tenant;

  afterSignUpRedirectUri?: string;
}) {
  const { setRoute } = useProtocolAuthSignUpFlow();
  const { protocol, navigate } = useProtocolAuth();
  const { setSignUp } = useProtocolAuthClient();
  const [creatingSignUp, setCreatingSignUp] = useState(false);
  const [createSignUpError, setCreateSignUpError] = useState<string>('');

  const FormSchema = z.object({
    ...(tenant.auth.nameRequired && {
      name: z
        .string({
          required_error: 'Please enter your full name',
        })
        .min(4),
    }),
    ...(tenant.auth.emailRequired && {
      email: z
        .string({
          required_error: 'Please enter your email address',
        })
        .email(),
    }),
    ...(tenant.auth.phoneRequired && {
      phone: z
        .string({
          required_error: 'Please enter your phone number',
        })
        .min(8),
    }),
    ...(tenant.auth.usernameRequired && {
      username: z
        .string({
          required_error: 'Please enter a username',
        })
        .min(5),
    }),
    ...(tenant.auth.passwordRequired && {
      password: z
        .string({
          required_error: 'Please enter a password',
        })
        .min(8),
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
  });

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    if (creatingSignUp) {
      return;
    }
    setCreatingSignUp(true);

    const response = await protocol.auth.signUpAttempts.create({
      body: {
        ...values,
        redirectUri: afterSignUpRedirectUri,
      },
    });

    handleSignUpResponse(
      response,
      setSignUp,
      setRoute,
      setCreateSignUpError,
      navigate,
    );

    setCreatingSignUp(false);
  }

  function onInvalid(errors: any) {
    console.log(errors);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onInvalid)}
        className="space-y-8"
      >
        {tenant.auth.nameRequired && (
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Name</FormLabel>
                </div>
                <FormControl>
                  <Input type="text" placeholder="Your Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {tenant.auth.emailRequired && (
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Email</FormLabel>
                </div>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="you@yourcompany.com"
                    {...field}
                  />
                </FormControl>
                {tenant.auth.emailVerificationRequired && (
                  <FormDescription>
                    We will email you a verification code to complete sign up.
                  </FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {tenant.auth.phoneRequired && (
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Phone</FormLabel>
                </div>
                <FormControl>
                  <Input type="tel" placeholder="+1 555-555-5555" {...field} />
                </FormControl>
                {tenant.auth.phoneVerificationRequired && (
                  <FormDescription>
                    We will text you a verification code to complete sign up.
                  </FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {tenant.auth.usernameRequired && (
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Username</FormLabel>
                </div>
                <FormControl>
                  <Input type="text" placeholder="@username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {tenant.auth.passwordRequired && (
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Password</FormLabel>
                </div>
                <FormControl>
                  <Input type="password" placeholder="***********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {createSignUpError && <FormMessage>{createSignUpError}</FormMessage>}

        <Button
          type="submit"
          variant="default"
          className="w-full uppercase"
          disabled={creatingSignUp}
        >
          {creatingSignUp && <Spinner color="white" />}
          {!creatingSignUp && 'Continue'}
        </Button>
      </form>
    </Form>
  );
}

interface SignUpRouteOptions {
  afterSignUpRedirectUri?: string;
}
export function SignUpRoute({ afterSignUpRedirectUri }: SignUpRouteOptions) {
  const component: AuthComponentType = 'signUp';
  const { appearance } = useProtocolAuthAppearance({ component });
  const { tenant } = useProtocolAuthTenant();
  const brandName = useBrandName({ component });
  const brandLogo = useBrandLogo({ component });

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
          {!brandLogo && (
            <CardTitle className={appearance?.elements?.cardHeaderTitle}>
              {tenant?.name}
            </CardTitle>
          )}

          <CardDescription
            className={appearance?.elements?.cardHeaderDescription}
          >
            Sign up to {brandName} to continue
          </CardDescription>
        </CardHeader>
        <CardContent className={appearance?.elements?.cardContent}>
          <SocialLinks appearance={appearance} tenant={tenant} />

          <SignUpForm
            tenant={tenant}
            afterSignUpRedirectUri={
              afterSignUpRedirectUri ?? tenant.auth.signUpRedirectUri
            }
          />
        </CardContent>
        <CardFooter className={appearance?.elements?.cardFooter}>
          <FooterLinks
            appearance={appearance}
            tenant={tenant}
            usingPasswords={false}
            component={component}
          />
        </CardFooter>
      </Card>
      <CardFooterLinks component={component} />
    </CardWrapper>
  );
}
