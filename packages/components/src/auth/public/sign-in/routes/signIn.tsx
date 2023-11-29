import { zodResolver } from '@hookform/resolvers/zod';
import {
  Tenant,
  AuthVerificationStrategy,
  AllowedFirstFactorStrategy,
} from '@protoxyz/types';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../../ui/form';
import { Button } from '../../../../ui/button';
import { Input } from '../../../../ui/input';
import { z } from 'zod';
import { AuthComponentType } from '@protoxyz/themes';
import {
  useBrandLogo,
  useBrandName,
  useProtocolAuth,
  useProtocolAuthAppearance,
  useProtocolAuthTenant,
  useProtocolAuthFlow,
  useProtocolAuthSignInFlow,
  useProtocolAuthClient,
} from '@protoxyz/auth/client';

import { CardWrapper } from '../../../custom-ui/card-wrapper';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../../ui/card';

import { BrandLogo, BrandLogoWrapper } from '../../../custom-ui/brand-logo';
import { SocialLinks } from '../../../custom-ui/social-links';
import { FooterLinks } from '../../../custom-ui/footer-links';
import { CardFooterLinks } from '../../../custom-ui/card-footer-links';
import { Spinner } from '../../../../ui/spinner';
import { handleSignInResponse } from '..';
import React from 'react';

const EmailLinkFormSchema = z.object({
  emailAddress: z.string().email(),
});

const EmailCodeFormSchema = z.object({
  emailAddress: z.string().email(),
});

const PhoneNumberCodeFormSchema = z.object({
  phoneNumber: z.string().min(8),
});

const EmailPasswordFormSchema = z.object({
  emailAddress: z.string().email(),
  password: z.string(),
});

const PhonePasswordFormSchema = z.object({
  phoneNumber: z.string().min(8),
  password: z.string(),
});

const UsernamePasswordFormSchema = z.object({
  username: z.string().min(4),
  password: z.string(),
});

export function SignInPhoneCodeForm({
  tenant,
  afterSignInRedirectUri,
}: {
  tenant: Tenant;
  afterSignInRedirectUri?: string;
}) {
  const { setRoute } = useProtocolAuthSignInFlow();
  const { protocol, navigate, setToken } = useProtocolAuth();
  const { setSignIn } = useProtocolAuthClient();
  const [creatingSignIn, setCreatingSignIn] = React.useState(false);
  const [createSignInError, setCreateSignInError] = React.useState<string>('');

  const form = useForm<z.infer<typeof PhoneNumberCodeFormSchema>>({
    resolver: zodResolver(PhoneNumberCodeFormSchema),
    defaultValues: {
      phoneNumber: '',
    },
  });

  async function onSubmit(values: z.infer<typeof PhoneNumberCodeFormSchema>) {
    if (creatingSignIn) {
      return;
    }
    setCreatingSignIn(true);

    const strategyValues = values as z.infer<typeof PhoneNumberCodeFormSchema>;

    const urlParams = new URLSearchParams(window.location.search);
    const redirectUri =
      urlParams.get('redirectUri') ??
      afterSignInRedirectUri ??
      window.location.origin;

    const response = await protocol?.auth.signInAttempts.create({
      body: {
        redirectUri,
        strategy: AuthVerificationStrategy.phone_code,
        identifier: strategyValues.phoneNumber,
      },
    });

    if (response) {
      handleSignInResponse(
        response,
        tenant,
        setSignIn,
        setRoute,
        setCreateSignInError,
        navigate,
        setToken,
      );
    }

    setCreatingSignIn(false);

    // setRoute(SignInFlowRoute["signIn:verifyFirstFactor"]);
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
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone number</FormLabel>

              <FormControl>
                <Input type="tel" placeholder="555-555-5555" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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

export function SignInPhonePasswordForm({
  tenant,
  afterSignInRedirectUri,
}: {
  tenant: Tenant;
  afterSignInRedirectUri?: string;
}) {
  const { setRoute } = useProtocolAuthSignInFlow();
  const { protocol, navigate, setToken } = useProtocolAuth();
  const { setSignIn } = useProtocolAuthClient();
  const [creatingSignIn, setCreatingSignIn] = React.useState(false);
  const [createSignInError, setCreateSignInError] = React.useState<string>('');

  const form = useForm<z.infer<typeof PhonePasswordFormSchema>>({
    resolver: zodResolver(PhonePasswordFormSchema),
    defaultValues: {
      phoneNumber: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof PhonePasswordFormSchema>) {
    if (creatingSignIn) {
      return;
    }
    setCreatingSignIn(true);

    const strategyValues = values as z.infer<typeof PhonePasswordFormSchema>;

    const urlParams = new URLSearchParams(window.location.search);
    const redirectUri =
      urlParams.get('redirectUri') ??
      afterSignInRedirectUri ??
      window.location.origin;

    const response = await protocol?.auth.signInAttempts.create({
      body: {
        redirectUri,
        strategy: AuthVerificationStrategy.phone_password,
        identifier: strategyValues.phoneNumber,
        password: strategyValues.password,
      },
    });

    handleSignInResponse(
      response,
      tenant,
      setSignIn,
      setRoute,
      setCreateSignInError,
      navigate,
      setToken,
    );

    setCreatingSignIn(false);

    // setRoute(SignInFlowRoute["signIn:verifyFirstFactor"]);
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
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone number</FormLabel>

              <FormControl>
                <Input type="tel" placeholder="555-555-5555" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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

export function SignInEmailCodeForm({
  tenant,
  afterSignInRedirectUri,
}: {
  tenant: Tenant;
  afterSignInRedirectUri?: string;
}) {
  const { setRoute } = useProtocolAuthSignInFlow();
  const { protocol, navigate, setToken } = useProtocolAuth();
  const { setSignIn } = useProtocolAuthClient();
  const [creatingSignIn, setCreatingSignIn] = React.useState(false);
  const [createSignInError, setCreateSignInError] = React.useState<string>('');

  const form = useForm<z.infer<typeof EmailCodeFormSchema>>({
    resolver: zodResolver(EmailCodeFormSchema),
    defaultValues: {
      emailAddress: '',
    },
  });

  async function onSubmit(values: z.infer<typeof EmailCodeFormSchema>) {
    if (creatingSignIn) {
      return;
    }
    setCreatingSignIn(true);

    const strategyValues = values as z.infer<typeof EmailCodeFormSchema>;
    const urlParams = new URLSearchParams(window.location.search);
    const redirectUri =
      urlParams.get('redirectUri') ??
      afterSignInRedirectUri ??
      window.location.origin;
    const response = await protocol?.auth.signInAttempts.create({
      body: {
        redirectUri,
        strategy: AuthVerificationStrategy.email_code,
        identifier: strategyValues.emailAddress,
      },
    });

    handleSignInResponse(
      response,
      tenant,
      setSignIn,
      setRoute,
      setCreateSignInError,
      navigate,
      setToken,
    );

    setCreatingSignIn(false);
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
        <FormField
          control={form.control}
          name="emailAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email address</FormLabel>

              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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

export function SignInEmailLinkForm({
  tenant,
  afterSignInRedirectUri,
}: {
  tenant: Tenant;
  afterSignInRedirectUri?: string;
}) {
  const { setRoute } = useProtocolAuthSignInFlow();
  const { protocol, navigate, setToken } = useProtocolAuth();
  const { setSignIn } = useProtocolAuthClient();
  const [creatingSignIn, setCreatingSignIn] = React.useState(false);
  const [createSignInError, setCreateSignInError] = React.useState<string>('');

  const form = useForm<z.infer<typeof EmailLinkFormSchema>>({
    resolver: zodResolver(EmailLinkFormSchema),
    defaultValues: {
      emailAddress: '',
    },
  });

  async function onSubmit(values: z.infer<typeof EmailLinkFormSchema>) {
    if (creatingSignIn) {
      return;
    }
    setCreatingSignIn(true);

    const strategyValues = values as z.infer<typeof EmailLinkFormSchema>;
    const urlParams = new URLSearchParams(window.location.search);
    const redirectUri =
      urlParams.get('redirectUri') ??
      afterSignInRedirectUri ??
      window.location.origin;
    const response = await protocol?.auth.signInAttempts.create({
      body: {
        redirectUri,
        strategy: AuthVerificationStrategy.email_link,
        identifier: strategyValues.emailAddress,
      },
    });

    handleSignInResponse(
      response,
      tenant,
      setSignIn,
      setRoute,
      setCreateSignInError,
      navigate,
      setToken,
    );

    setCreatingSignIn(false);
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
        <FormField
          control={form.control}
          name="emailAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email address</FormLabel>

              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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

export function SignInEmailPasswordForm({
  tenant,
  afterSignInRedirectUri,
}: {
  tenant: Tenant;
  afterSignInRedirectUri?: string;
}) {
  const { setRoute } = useProtocolAuthSignInFlow();
  const { protocol, navigate, setToken } = useProtocolAuth();
  const { setSignIn } = useProtocolAuthClient();
  const [creatingSignIn, setCreatingSignIn] = React.useState(false);
  const [createSignInError, setCreateSignInError] = React.useState<string>('');

  const form = useForm<z.infer<typeof EmailPasswordFormSchema>>({
    resolver: zodResolver(EmailPasswordFormSchema),
    defaultValues: {
      emailAddress: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof EmailPasswordFormSchema>) {
    if (creatingSignIn) {
      return;
    }
    setCreatingSignIn(true);

    const strategyValues = values as z.infer<typeof EmailPasswordFormSchema>;
    const urlParams = new URLSearchParams(window.location.search);
    const redirectUri =
      urlParams.get('redirectUri') ??
      afterSignInRedirectUri ??
      window.location.origin;
    const response = await protocol?.auth.signInAttempts.create({
      body: {
        redirectUri,
        strategy: AuthVerificationStrategy.email_password,
        identifier: strategyValues.emailAddress,
        password: strategyValues.password,
      },
    });

    handleSignInResponse(
      response,
      tenant,
      setSignIn,
      setRoute,
      setCreateSignInError,
      navigate,
      setToken,
    );

    setCreatingSignIn(false);
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
        <FormField
          control={form.control}
          name="emailAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email address</FormLabel>

              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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

export function SignInUsernamePasswordForm({
  tenant,
  afterSignInRedirectUri,
}: {
  tenant: Tenant;
  afterSignInRedirectUri?: string;
}) {
  const { setRoute } = useProtocolAuthSignInFlow();
  const { protocol, navigate, setToken } = useProtocolAuth();
  const { setSignIn } = useProtocolAuthClient();
  const [creatingSignIn, setCreatingSignIn] = React.useState(false);
  const [createSignInError, setCreateSignInError] = React.useState<string>('');

  const form = useForm<z.infer<typeof UsernamePasswordFormSchema>>({
    resolver: zodResolver(UsernamePasswordFormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof UsernamePasswordFormSchema>) {
    if (creatingSignIn) {
      return;
    }
    setCreatingSignIn(true);

    const strategyValues = values as z.infer<typeof UsernamePasswordFormSchema>;
    const urlParams = new URLSearchParams(window.location.search);
    const redirectUri =
      urlParams.get('redirectUri') ??
      afterSignInRedirectUri ??
      window.location.origin;
    const response = await protocol?.auth.signInAttempts.create({
      body: {
        redirectUri,
        strategy: AuthVerificationStrategy.username_password,
        identifier: strategyValues.username,
        password: strategyValues.password,
      },
    });

    handleSignInResponse(
      response,
      tenant,
      setSignIn,
      setRoute,
      setCreateSignInError,
      navigate,
      setToken,
    );

    setCreatingSignIn(false);
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
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>

              <FormControl>
                <Input type="text" placeholder="yourusername" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
  const { firstFactorStrategy } = useProtocolAuth();
  const brandName = useBrandName({ component });
  const brandLogo = useBrandLogo({ component });
  const usingPasswords = tenant?.auth?.passwordsEnabled;
  const { signIn } = useProtocolAuthFlow();

  return (
    <CardWrapper
      component={component}
      className={appearance?.elements?.cardWrapper}
    >
      <Card className={appearance?.elements?.card}>
        <CardHeader className={appearance?.elements?.cardHeader}>
          {appearance?.layout?.headerPlacement !== 'none' && (
            <>
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
                Log in to {brandName} to continue
              </CardDescription>
            </>
          )}
        </CardHeader>
        <CardContent className={appearance?.elements?.cardContent}>
          <SocialLinks appearance={appearance} tenant={tenant} />

          {firstFactorStrategy === AuthVerificationStrategy.email_code && (
            <SignInEmailCodeForm
              tenant={tenant}
              afterSignInRedirectUri={
                afterSignInRedirectUri ?? tenant?.auth?.homeUri
              }
            />
          )}

          {firstFactorStrategy === AuthVerificationStrategy.email_link && (
            <SignInEmailLinkForm
              tenant={tenant}
              afterSignInRedirectUri={
                afterSignInRedirectUri ?? tenant?.auth?.homeUri
              }
            />
          )}

          {firstFactorStrategy === AuthVerificationStrategy.phone_code && (
            <SignInPhoneCodeForm
              tenant={tenant}
              afterSignInRedirectUri={
                afterSignInRedirectUri ?? tenant?.auth?.homeUri
              }
            />
          )}

          {firstFactorStrategy === AuthVerificationStrategy.email_password && (
            <SignInEmailPasswordForm
              tenant={tenant}
              afterSignInRedirectUri={
                afterSignInRedirectUri ?? tenant?.auth?.homeUri
              }
            />
          )}

          {firstFactorStrategy ===
            AuthVerificationStrategy.username_password && (
            <SignInUsernamePasswordForm
              tenant={tenant}
              afterSignInRedirectUri={
                afterSignInRedirectUri ?? tenant?.auth?.homeUri
              }
            />
          )}

          {firstFactorStrategy === AuthVerificationStrategy.phone_password && (
            <SignInPhonePasswordForm
              tenant={tenant}
              afterSignInRedirectUri={
                afterSignInRedirectUri ?? tenant?.auth?.homeUri
              }
            />
          )}
        </CardContent>
        <CardFooter className={appearance?.elements?.cardFooter}>
          <FooterLinks
            appearance={appearance}
            tenant={tenant}
            usingPasswords={usingPasswords ?? false}
            component={component}
          />
        </CardFooter>
      </Card>
      <CardFooterLinks component={component} />
    </CardWrapper>
  );
}
