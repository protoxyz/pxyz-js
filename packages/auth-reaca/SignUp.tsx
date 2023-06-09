import { EmailInput } from '@/components/ui/inputs/EmailInput';
import { NameInput } from '@/components/ui/inputs/NameInput';
import { PhoneInput } from '@/components/ui/inputs/PhoneInput';
import { PrimaryButton } from '@/components/ui/inputs/Button';
import { PasswordInput } from '@/components/ui/inputs/PasswordInput';
import { Header } from '@/components/ui/Header';
import { OAuthMode, SocialButtons } from '@/components/ui/Social';
import { getWindowError } from '@/utils';
import { useProtocolAuth } from '@/providers/protocol';
import { CreateSignUpAttemptOptions } from '@protoxyz/core';
import { useEffect, useMemo, useState } from 'react';
import { SecuredBy } from '@/components/ui/SecuredBy';
import { PhoneVerification } from '@/components/ui/PhoneVerification';
import { EmailVerification } from '@/components/ui/EmailVerification';
import { SignUpCard } from '@/components/ui/Card';
import { IsLoggedOut } from '@/components/control/IsLoggedOut';
import { Label } from '@/components/ui/inputs/Label';
import { Spinner } from '@/components/ui/Spinner';
import {
  AuthSignUpAttemptStatus,
  AuthenticationStrategy,
} from '@protoxyz/types';
import {
  ThemeHeaderPlacement,
  ThemeSocialPlacement,
  ThemeSocialType,
} from '@protoxyz/themes';

export interface SignUpProps {
  headerPlacement?: ThemeHeaderPlacement;
  socialPlacement?: ThemeSocialPlacement;
  socialType?: ThemeSocialType;

  redirectUrl?: string;
  afterSignInUrl?: string;
  afterSignUpUrl?: string;
  signUpUrl?: string;
}
export function SignUp({
  headerPlacement = ThemeHeaderPlacement.inside,
  socialPlacement = ThemeSocialPlacement.top,
  socialType = ThemeSocialType.button,
  redirectUrl,
  afterSignInUrl,
  afterSignUpUrl,
  signUpUrl,
}: SignUpProps) {
  const [queryError, setQueryError] = useState('' as string | null);

  useEffect(() => {
    setQueryError(getWindowError());
  }, []);

  const {
    instance,
    createSignUpAttempt,
    isCreatingSignUpAttempt,
    signUpAttempt,
    signUpError,
  } = useProtocolAuth();

  // useEffect(() => {
  //     if (user) {
  //         router.push(instance?.homeUri || "/");
  //     }
  // }, [user, instance]);

  const header = useMemo(
    () => (headerPlacement === ThemeHeaderPlacement.none ? null : <Header />),
    [headerPlacement],
  );

  const hasNonSocialSignIn = useMemo(() => {
    return (
      instance?.emailSignInEnabled ||
      instance?.phoneSignInEnabled ||
      instance?.usernameSignInEnabled ||
      instance?.strategy === AuthenticationStrategy.passwords
    );
  }, [
    instance?.emailSignInEnabled,
    instance?.usernameSignInEnabled,
    instance?.phoneSignInEnabled,
    instance?.strategy,
  ]);

  const socialButtons = useMemo(
    () =>
      instance?.socialProviders && instance.socialProviders.length > 0 ? (
        <SocialButtons
          hasNonSocialSignIn={hasNonSocialSignIn}
          providers={instance.socialProviders}
          placement={socialPlacement}
          type={socialType}
          mode={OAuthMode.signUp}
        />
      ) : null,
    [
      instance?.socialProviders,
      socialPlacement,
      socialType,
      hasNonSocialSignIn,
    ],
  );

  const onCreateSignUpAttempt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email')?.toString();
    const username = formData.get('username')?.toString();
    const password = formData.get('password')?.toString();
    const phone = formData.get('phone')?.toString();
    const firstName = formData.get('firstName')?.toString();
    const lastName = formData.get('lastName')?.toString();
    const redirectUri = redirectUrl || afterSignInUrl;

    const data = {
      redirectUri,
      email,
      username,
      password,
      phone,
      firstName,
      lastName,
    } as CreateSignUpAttemptOptions['body'];

    createSignUpAttempt(data);
  };

  if (!instance) {
    return null;
  }

  const missingVerifications = signUpAttempt?.missingVerifications || [];
  const missingVerification =
    missingVerifications.length > 0 ? missingVerifications[0] : null;

  return (
    <IsLoggedOut>
      <div className="mx-auto w-full max-w-md">
        {headerPlacement === ThemeHeaderPlacement.outside && header}

        <div className="relative mt-8">
          <SignUpCard>
            {headerPlacement === ThemeHeaderPlacement.inside && header}
            {!signUpAttempt &&
              socialPlacement === ThemeSocialPlacement.top &&
              socialButtons}

            {signUpAttempt &&
              signUpAttempt.status === AuthSignUpAttemptStatus.complete && (
                <div className="flex items-center justify-center">
                  <Spinner size="3xl" />
                </div>
              )}

            {signUpAttempt &&
              missingVerification &&
              signUpAttempt.status ===
                AuthSignUpAttemptStatus.needs_verification &&
              !signUpAttempt.oauthProviderId && (
                <>
                  {missingVerification === 'phone' && (
                    <PhoneVerification mode="sign-up" />
                  )}
                  {missingVerification === 'email' && (
                    <EmailVerification mode="sign-up" />
                  )}
                </>
              )}

            {signUpAttempt &&
              signUpAttempt.status ===
                AuthSignUpAttemptStatus.needs_verification &&
              signUpAttempt.oauthProviderId && (
                <div className="flex items-center justify-center">
                  <Spinner size="3xl" />
                </div>
              )}

            {!signUpAttempt && (
              <form
                method="POST"
                className="space-y-6"
                onSubmit={onCreateSignUpAttempt}
              >
                {instance?.identifierName && instance.nameRequired && (
                  <div className="space-y-1">
                    <NameInput
                      placeholder=""
                      required={instance.nameRequired}
                    />
                  </div>
                )}

                {instance?.identifierEmailAddress &&
                  instance.emailAddressRequired && (
                    <div className="space-y-1">
                      <Label key="email" label="Email" />
                      <EmailInput
                        placeholder=""
                        required={instance.emailAddressRequired}
                      />
                    </div>
                  )}

                {instance?.identifierPhoneNumber &&
                  instance.phoneNumberRequired && (
                    <div className="space-y-1">
                      <Label key="phone" label="Phone" />
                      <PhoneInput
                        placeholder=""
                        required={instance.phoneNumberRequired}
                      />
                    </div>
                  )}

                {instance?.strategy === AuthenticationStrategy.passwords && (
                  <div className="space-y-1">
                    <Label key="password" label="Password" />
                    <PasswordInput placeholder="" />
                  </div>
                )}

                <PrimaryButton
                  full
                  type="submit"
                  loading={isCreatingSignUpAttempt}
                >
                  Sign Up
                </PrimaryButton>

                {queryError && (
                  <div className="text-sm text-red-500">{queryError}</div>
                )}
                {signUpError && (
                  <div className="text-sm text-red-500">
                    {signUpError?.error}
                  </div>
                )}
              </form>
            )}

            {socialPlacement === ThemeSocialPlacement.bottom && socialButtons}
            {!instance?.hideProtocolBranding && <SecuredBy />}
          </SignUpCard>
        </div>
      </div>
    </IsLoggedOut>
  );
}
