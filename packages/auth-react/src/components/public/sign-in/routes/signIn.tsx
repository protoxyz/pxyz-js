import { zodResolver } from '@hookform/resolvers/zod';
import {
  Tenant,
  AuthVerificationStrategy,
  AllowedFirstFactorStrategy,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../ui/select';
import { BrandLogo, BrandLogoWrapper } from '../../../custom-ui/brand-logo';
import { SocialLinks } from '../../../custom-ui/social-links';
import { FooterLinks } from '../../../custom-ui/footer-links';
import { CardFooterLinks } from '../../../custom-ui/card-footer-links';
import {
  useProtocolAuthFlow,
  useProtocolAuthSignInFlow,
} from '../../../../contexts/flow-context';
import { useProtocolAuthClient } from '../../../../contexts/client-context';
import { Spinner } from '../../../ui/spinner';
import { handleSignInResponse } from '..';

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

function getAlternativeFirstFactorStrategiesFor(
  currentStrategy: AllowedFirstFactorStrategy,
  tenant: Tenant,
) {
  let strategies = [];

  if (
    currentStrategy !== AuthVerificationStrategy.email_code &&
    tenant?.auth?.strategyEmailCodeEnabled
  ) {
    strategies.push({
      name: 'Email (passwordless)',
      value: AuthVerificationStrategy.email_code,
    });
  }

  if (
    currentStrategy !== AuthVerificationStrategy.email_link &&
    tenant?.auth?.strategyEmailLinkEnabled
  ) {
    strategies.push({
      name: 'Email (passwordless link)',
      value: AuthVerificationStrategy.email_link,
    });
  }

  if (
    currentStrategy !== AuthVerificationStrategy.phone_code &&
    tenant?.auth?.strategyPhoneCodeEnabled
  ) {
    strategies.push({
      name: 'Phone (passwordless)',
      value: AuthVerificationStrategy.phone_code,
    });
  }

  if (
    currentStrategy !== AuthVerificationStrategy.email_password &&
    tenant?.auth?.strategyEmailPasswordEnabled
  ) {
    strategies.push({
      name: 'Email & Password',
      value: AuthVerificationStrategy.email_password,
    });
  }

  if (
    currentStrategy !== AuthVerificationStrategy.phone_password &&
    tenant?.auth?.strategyPhonePasswordEnabled
  ) {
    strategies.push({
      name: 'Phone & Password',
      value: AuthVerificationStrategy.phone_password,
    });
  }

  if (
    currentStrategy !== AuthVerificationStrategy.username_password &&
    tenant?.auth?.strategyUsernamePasswordEnabled
  ) {
    strategies.push({
      name: 'Username & Password',
      value: AuthVerificationStrategy.username_password,
    });
  }

  return strategies;
}

function AlternativeSignInSelect({
  alternativeStrategies,
  setFirstFactorStrategy,
}: {
  alternativeStrategies: {
    value: AllowedFirstFactorStrategy;
    name: string;
  }[];
  setFirstFactorStrategy: (type: AllowedFirstFactorStrategy) => void;
}) {
  if (alternativeStrategies.length === 0) {
    return null;
  }

  return (
    <Select
      onValueChange={(val: AllowedFirstFactorStrategy) =>
        setFirstFactorStrategy(val)
      }
    >
      <SelectTrigger className="w-[96px]">
        <SelectValue placeholder="change" />
      </SelectTrigger>
      <SelectContent>
        {alternativeStrategies.map((strategy) => (
          <SelectItem key={strategy.value} value={strategy.value}>
            {strategy.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export function SignInPhoneCodeForm({
  tenant,
  afterSignInRedirectUri,
}: {
  tenant: Tenant;
  afterSignInRedirectUri?: string;
}) {
  const { setRoute } = useProtocolAuthSignInFlow();
  const { protocol, navigate } = useProtocolAuth();
  const { setSignIn } = useProtocolAuthClient();
  const [creatingSignIn, setCreatingSignIn] = useState(false);
  const [createSignInError, setCreateSignInError] = useState<string>('');

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

    const response = await protocol.auth.signInAttempts.create({
      body: {
        redirectUri,
        strategy: AuthVerificationStrategy.phone_code,
        identifier: strategyValues.phoneNumber,
      },
    });

    handleSignInResponse(
      response,
      tenant,
      setSignIn,
      setRoute,
      setCreateSignInError,
      navigate,
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

export function SignInPhonePasswordForm({
  tenant,
  afterSignInRedirectUri,
}: {
  tenant: Tenant;
  afterSignInRedirectUri?: string;
}) {
  const { setRoute } = useProtocolAuthSignInFlow();
  const { protocol, navigate } = useProtocolAuth();
  const { setSignIn } = useProtocolAuthClient();
  const [creatingSignIn, setCreatingSignIn] = useState(false);
  const [createSignInError, setCreateSignInError] = useState<string>('');

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

    const response = await protocol.auth.signInAttempts.create({
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
  const { protocol, navigate } = useProtocolAuth();
  const { setSignIn } = useProtocolAuthClient();
  const [creatingSignIn, setCreatingSignIn] = useState(false);
  const [createSignInError, setCreateSignInError] = useState<string>('');

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
    const response = await protocol.auth.signInAttempts.create({
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
  const { protocol, navigate } = useProtocolAuth();
  const { setSignIn } = useProtocolAuthClient();
  const [creatingSignIn, setCreatingSignIn] = useState(false);
  const [createSignInError, setCreateSignInError] = useState<string>('');

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
    const response = await protocol.auth.signInAttempts.create({
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
  const { protocol, navigate } = useProtocolAuth();
  const { setSignIn } = useProtocolAuthClient();
  const [creatingSignIn, setCreatingSignIn] = useState(false);
  const [createSignInError, setCreateSignInError] = useState<string>('');

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
    const response = await protocol.auth.signInAttempts.create({
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
  const { protocol, navigate } = useProtocolAuth();
  const { setSignIn } = useProtocolAuthClient();
  const [creatingSignIn, setCreatingSignIn] = useState(false);
  const [createSignInError, setCreateSignInError] = useState<string>('');

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
    const response = await protocol.auth.signInAttempts.create({
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

          {signIn.firstFactorStrategy ===
            AuthVerificationStrategy.email_code && (
            <SignInEmailCodeForm
              tenant={tenant}
              afterSignInRedirectUri={
                afterSignInRedirectUri ?? tenant?.auth?.homeUri
              }
            />
          )}

          {signIn.firstFactorStrategy ===
            AuthVerificationStrategy.email_link && (
            <SignInEmailLinkForm
              tenant={tenant}
              afterSignInRedirectUri={
                afterSignInRedirectUri ?? tenant?.auth?.homeUri
              }
            />
          )}

          {signIn.firstFactorStrategy ===
            AuthVerificationStrategy.phone_code && (
            <SignInPhoneCodeForm
              tenant={tenant}
              afterSignInRedirectUri={
                afterSignInRedirectUri ?? tenant?.auth?.homeUri
              }
            />
          )}

          {signIn.firstFactorStrategy ===
            AuthVerificationStrategy.email_password && (
            <SignInEmailPasswordForm
              tenant={tenant}
              afterSignInRedirectUri={
                afterSignInRedirectUri ?? tenant?.auth?.homeUri
              }
            />
          )}

          {signIn.firstFactorStrategy ===
            AuthVerificationStrategy.username_password && (
            <SignInUsernamePasswordForm
              tenant={tenant}
              afterSignInRedirectUri={
                afterSignInRedirectUri ?? tenant?.auth?.homeUri
              }
            />
          )}

          {signIn.firstFactorStrategy ===
            AuthVerificationStrategy.phone_password && (
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
            usingPasswords={usingPasswords}
            component={component}
          />
        </CardFooter>
      </Card>
      <CardFooterLinks component={component} />
    </CardWrapper>
  );
}
