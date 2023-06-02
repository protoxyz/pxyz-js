import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { AuthVerificationStrategy, ResponseStatus, SocialConnection, SocialProvider } from "@protoxyz/core";
import { useProtocolAuth } from "@protoxyz/auth-react";
import clsx from "clsx";
import { useMemo, useState } from "react";
import { Divider } from "./Divider";
import { providers } from "@protoxyz/auth-providers";
import * as SocialIcons from "../icons/social";
import { Spinner } from "./Spinner";
import { ThemeSocialPlacement, ThemeSocialType } from "../types";

export enum OAuthMode {
    signIn = "signIn",
    signUp = "signUp",
    connection = "connection",
}

export interface SocialButtonProps {
    providerKey: string;
    type: ThemeSocialType;
    mode: OAuthMode;
    text?: string;
    onAddConnection?: (connecton: SocialConnection) => void;
}
export function SocialButton({ providerKey, type, text, mode, onAddConnection }: SocialButtonProps) {
    const {
        client,
        theme,
        isCreatingOAuthSignInAttempt,
        oauthSignInAttemptProvider,
        createSignInAttempt,
        isCreatingOAuthSignUpAttempt,
        createSignUpAttempt,
        oauthSignUpAttemptProvider,
    } = useProtocolAuth();
    const provider = useMemo(() => providers[providerKey], [providerKey]);
    const Icon = SocialIcons[providerKey as keyof typeof SocialIcons];
    const [creatingConnection, setCreatingConnection] = useState(false);

    const createConnection = async () => {
        setCreatingConnection(true);
        const result = await client.auth.socialConnections.create({
            body: {
                providerKey,
                redirectUri: window.location.href,
            },
        });
        setCreatingConnection(false);

        if (result.status === ResponseStatus.Success) {
            if (result.data.connection) onAddConnection?.(result.data.connection);
            if (result.data.authorizeUri) window.location.href = result.data.authorizeUri;
        }
    };

    const onClick = () => {
        switch (mode) {
            case OAuthMode.signIn:
                {
                    createSignInAttempt({ strategy: AuthVerificationStrategy.oauth, providerKey: provider?.id });
                }
                break;
            case OAuthMode.signUp:
                {
                    createSignUpAttempt({ strategy: AuthVerificationStrategy.oauth, providerKey: provider?.id });
                }
                break;
            case OAuthMode.connection:
                {
                    createConnection();
                }
                break;
        }
    };

    const isLoading = useMemo(() => {
        switch (mode) {
            case OAuthMode.signIn: {
                return isCreatingOAuthSignInAttempt && providerKey === oauthSignInAttemptProvider;
            }
            case OAuthMode.signUp: {
                return isCreatingOAuthSignUpAttempt && providerKey === oauthSignUpAttemptProvider;
            }
            case OAuthMode.connection: {
                return creatingConnection;
            }
        }
    }, [
        mode,
        isCreatingOAuthSignInAttempt,
        isCreatingOAuthSignUpAttempt,
        providerKey,
        oauthSignInAttemptProvider,
        oauthSignUpAttemptProvider,
        creatingConnection,
    ]);

    return (
        <div>
            <button
                onClick={onClick}
                className={clsx(
                    "flex h-full w-full flex-grow gap-2",
                    theme?.socialButtonPaddingHorizontal,
                    theme?.socialButtonPaddingVertical,
                    theme?.socialButtonBorder,
                    theme?.socialButtonBorderRadius,
                    theme?.socialButtonBorderColor,
                    theme?.socialButtonBgColor,
                    theme?.socialButtonTextColor,
                    theme?.socialButtonFontSize,
                    theme?.socialButtonFontWeight,
                    type === ThemeSocialType.button
                        ? "w-full items-center justify-start"
                        : "items-center justify-center",
                )}
            >
                {isLoading && <Spinner size="md" />}
                {!isLoading && (
                    <>
                        <span className="sr-only">Sign in with {provider?.name}</span>
                        {Icon && (
                            <Icon
                                className={clsx(
                                    theme?.socialButtonIconFill,
                                    theme?.socialButtonIconWidth,
                                    theme?.socialButtonIconHeight,
                                )}
                            />
                        )}
                        {type === ThemeSocialType.icon && !Icon && <span>{provider?.name}</span>}
                        {type === ThemeSocialType.button && text && <span>{text}</span>}
                        {type === ThemeSocialType.button && !text && (
                            <span>
                                {mode === OAuthMode.signUp && `Sign up with ${provider?.name}`}
                                {mode === OAuthMode.signIn && `Sign in with ${provider?.name}`}
                                {mode === OAuthMode.connection && `Connect ${provider?.name} account`}
                            </span>
                        )}
                        {type === ThemeSocialType.button && <ChevronRightIcon className="ml-auto h-5 w-5" />}
                    </>
                )}
            </button>
        </div>
    );
}

export interface SocialButtonsProps {
    placement: ThemeSocialPlacement;
    type: ThemeSocialType;
    providers: SocialProvider[];
    hasNonSocialSignIn: boolean;
    mode: OAuthMode;
}
export function SocialButtons({ placement, type, providers, hasNonSocialSignIn, mode }: SocialButtonsProps) {
    const gridColsClass = useMemo(() => {
        if (type === ThemeSocialType.button) return "grid-cols-1";

        switch (providers?.length) {
            case 1:
                return "grid-cols-1";
            case 2:
                return "grid-cols-2";
            case 3:
                return "grid-cols-3";
            case 4:
                return "grid-cols-4";
            default:
                return "grid-cols-3";
        }
    }, [providers?.length, type]);

    return (
        <div className="mt-6">
            {hasNonSocialSignIn && placement === ThemeSocialPlacement.bottom && <Divider />}

            <div className={clsx("grid gap-3", gridColsClass, ThemeSocialPlacement.top ? "mb-6" : "mt-6")}>
                {providers?.map(({ providerKey }) => (
                    <SocialButton key={providerKey} providerKey={providerKey} type={type} mode={mode} />
                ))}
            </div>

            {hasNonSocialSignIn && placement === ThemeSocialPlacement.top && <Divider />}
        </div>
    );
}
