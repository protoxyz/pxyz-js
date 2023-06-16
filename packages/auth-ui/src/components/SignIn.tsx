import { Localization } from "../types";
import { PrimaryButton } from "../inputs/Button";
import { EmailInput } from "../inputs/EmailInput";
import { PasswordInput } from "../inputs/PasswordInput";
import { Header } from "./Header";
import { OAuthMode, SocialButtons } from "./Social";
import { enUS } from "../localizations";
import { getWindowError } from "../utils";
import { useEffect, useMemo, useState } from "react";
import { useProtocolAuth } from "@protoxyz/auth-react";
import { ThemeHeaderPlacement, ThemeSocialPlacement, ThemeSocialType } from "../types";
import { AuthenticationStrategy, AuthSignInAttemptStatus, AuthVerificationStrategy } from "@protoxyz/core";
import { PhoneInput } from "../inputs";
import { SecuredBy } from "./SecuredBy";

import { SignInCard } from "./Card";
import { useRouter } from "next/navigation";
import { IsLoggedOut } from "./IsLoggedOut";
import { EmailVerification } from "./EmailVerification";
import { PhoneVerification } from "./PhoneVerification";
import { Label } from "../inputs/Label";
import { Spinner } from "./Spinner";

export interface SignInProps {
    headerPlacement?: ThemeHeaderPlacement;
    socialPlacement?: ThemeSocialPlacement;
    socialType?: ThemeSocialType;

    localization?: Localization;
}
export function SignIn({
    headerPlacement = ThemeHeaderPlacement.inside,
    socialPlacement = ThemeSocialPlacement.top,
    socialType = ThemeSocialType.button,
    localization = enUS,
}: SignInProps) {
    const [queryError, setQueryError] = useState("" as string | null);
    const router = useRouter();

    useEffect(() => {
        setQueryError(getWindowError());
    }, []);

    const {
        instance,
        isLoaded,
        createSignInAttempt,
        isCreatingSignInAttempt,
        signInAttempt,
        isAttemptingSignInFirstFactor,
        attemptSignInFirstFactor,
        signInError,
        resetSignInState,
        user,
    } = useProtocolAuth();

    // useEffect(() => {
    //     if (user) {
    //         router.push(instance?.homeUri || "/");
    //     }
    // }, [user, instance]);

    useEffect(function callback() {
        return function () {
            resetSignInState();
            setQueryError(null);
        };
    }, []);

    const header = useMemo(
        () => (headerPlacement === ThemeHeaderPlacement.none ? null : <Header />),
        [headerPlacement],
    );

    const hasNonSocialSignIn = useMemo(() => {
        return (
            instance?.emailSignInEnabled ||
            instance?.phoneSignInEnabled ||
            instance?.strategy === AuthenticationStrategy.passwords
        );
    }, [instance?.emailSignInEnabled, instance?.phoneSignInEnabled, instance?.strategy]);

    const socialButtons = useMemo(
        () =>
            instance?.socialProviders && instance.socialProviders.length > 0 ? (
                <SocialButtons
                    mode={OAuthMode.signIn}
                    providers={instance.socialProviders}
                    placement={socialPlacement}
                    type={socialType}
                    hasNonSocialSignIn={hasNonSocialSignIn}
                />
            ) : null,
        [instance?.socialProviders, socialPlacement, socialType, hasNonSocialSignIn],
    );

    const onCreateSignInAttempt = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email")?.toString();
        const password = formData.get("password")?.toString();
        const phone = formData.get("phone")?.toString();

        if (email) {
            if (instance?.strategy === "passwordless") {
                if (instance?.emailVerificationCodeEnabled) {
                    createSignInAttempt({ identifier: email, strategy: AuthVerificationStrategy.email_code });
                } else if (instance?.emailVerificationLinkEnabled) {
                    createSignInAttempt({ identifier: email, strategy: AuthVerificationStrategy.email_link });
                }
            } else {
                createSignInAttempt({ identifier: email, password, strategy: AuthVerificationStrategy.password });
            }
        } else if (phone) {
            if (instance?.phoneSignInEnabled) {
                createSignInAttempt({ identifier: phone, strategy: AuthVerificationStrategy.phone_code });
            }
        }
    };

    const onAttemptSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const code = formData.get("code")?.toString() || "";

        attemptSignInFirstFactor({ code });
    };

    if (!isLoaded) return null;

    const shouldShowHeader = !signInAttempt || signInAttempt?.strategy !== AuthVerificationStrategy.oauth;

    return (
        <IsLoggedOut>
            <div className="mx-auto w-full max-w-md">
                {shouldShowHeader && headerPlacement === ThemeHeaderPlacement.outside && header}

                <div className="relative mt-8">
                    <SignInCard>
                        {shouldShowHeader && headerPlacement === ThemeHeaderPlacement.inside && header}

                        {signInAttempt && signInAttempt.status === AuthSignInAttemptStatus.complete && (
                            <div className="flex items-center justify-center">
                                <Spinner size="3xl" />
                            </div>
                        )}

                        {signInAttempt &&
                            signInAttempt.status === AuthSignInAttemptStatus.needs_factor_one &&
                            signInAttempt.strategy === AuthVerificationStrategy.oauth && (
                                <div className="flex items-center justify-center">
                                    <Spinner size="3xl" />
                                </div>
                            )}

                        {signInAttempt &&
                            signInAttempt.strategy === AuthVerificationStrategy.email_code &&
                            signInAttempt.status === AuthSignInAttemptStatus.needs_factor_one && (
                                <EmailVerification mode="sign-in" />
                            )}

                        {signInAttempt &&
                            signInAttempt.strategy === AuthVerificationStrategy.phone_code &&
                            signInAttempt.status === AuthSignInAttemptStatus.needs_factor_one && (
                                <PhoneVerification mode="sign-in" />
                            )}

                        {(!signInAttempt ||
                            (instance?.strategy === AuthenticationStrategy.passwords &&
                                signInAttempt?.status === AuthSignInAttemptStatus.needs_factor_one)) && (
                            <>
                                {socialPlacement === ThemeSocialPlacement.top && socialButtons}

                                <form method="POST" className="space-y-6" onSubmit={onCreateSignInAttempt}>
                                    <>
                                        {instance?.emailSignInEnabled && (
                                            <div className="space-y-1">
                                                <Label key="email" label="Email Address" />
                                                <EmailInput placeholder="" />
                                            </div>
                                        )}

                                        {instance?.phoneSignInEnabled && (
                                            <div className="space-y-1">
                                                <Label key="phone" label="Phone Number" />
                                                <PhoneInput placeholder="" />
                                            </div>
                                        )}

                                        {instance?.strategy === AuthenticationStrategy.passwords && (
                                            <div className="space-y-1">
                                                <Label key="password" label="Password" />
                                                <PasswordInput placeholder="" />
                                                {/* <div className="flex items-center justify-between">
                                                    <div className="text-sm text-zinc-400">
                                                        <Link href="/forgot-password" className={clsx("font-medium")}>
                                                            {localization.signIn_link_forgotPassword}
                                                        </Link>
                                                    </div>
                                                </div> */}
                                            </div>
                                        )}

                                        {hasNonSocialSignIn && (
                                            <PrimaryButton type="submit" full loading={isCreatingSignInAttempt}>
                                                Sign In
                                            </PrimaryButton>
                                        )}

                                        {signInError && (
                                            <div className="text-sm text-red-500">{signInError?.error}</div>
                                        )}

                                        {queryError && <div className="text-sm text-red-500">{queryError}</div>}
                                    </>
                                </form>

                                {socialPlacement === ThemeSocialPlacement.bottom && socialButtons}
                            </>
                        )}
                        {!instance?.hideProtocolBranding && <SecuredBy />}
                    </SignInCard>
                </div>
            </div>
        </IsLoggedOut>
    );
}
