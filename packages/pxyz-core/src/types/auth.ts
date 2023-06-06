import { Theme } from "./brand";

export interface SessionUser {
    id: string;
    sessionId: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    emailVerified: boolean;
    phone: string;
    phoneVerified: boolean;
    image: string;
    timezone: string;
    locale: string;
}

export interface FeatureFlag {
    id?: string;
    key: string;
    value: string;
}

export const AuthenticationStrategy = {
    passwords: "passwords",
    passwordless: "passwordless",
};
export type AuthenticationStrategy = (typeof AuthenticationStrategy)[keyof typeof AuthenticationStrategy];

export type AllowedIdentifierType = "email" | "phone" | "username";
export type AllowedFirstFactorStrategy = "password" | "email_code" | "email_link" | "phone_code" | "oauth";
export type AllowedSecondFactorStrategy = "password" | "authenticator_code" | "security_key";

export const AuthSignInAttemptStatus = {
    needs_identifier: "needs_identifier",
    needs_factor_one: "needs_factor_one",
    needs_factor_two: "needs_factor_two",
    complete: "complete",
};
export type AuthSignInAttemptStatus = (typeof AuthSignInAttemptStatus)[keyof typeof AuthSignInAttemptStatus];

export const AuthVerificationStrategy = {
    email_link: "email_link",
    email_code: "email_code",
    phone_code: "phone_code",
    password: "password",
    oauth: "oauth",
    authenticator_code: "authenticator_code",
    security_key: "security_key",
};
export type AuthVerificationStrategy = (typeof AuthVerificationStrategy)[keyof typeof AuthVerificationStrategy];

export interface SignInAttempt {
    id: string;

    userId: string | null | undefined;

    identifier: string | null | undefined;
    status: AuthSignInAttemptStatus;
    strategy: AuthVerificationStrategy | null | undefined;
    oauthProviderId?: string | null | undefined;
    oauthProvider?: InstanceSocialProvider | null | undefined;

    redirectUri: string | null | undefined;
    authorizeUri?: string | undefined;

    createdAt: Date | string;
    updatedAt: Date | string;
}

export interface InstanceSocialProvider {
    id: string;
    providerKey: string;
    enabled: boolean;
}

export const AuthSignUpAttemptStatus = {
    missing_requirements: "missing_requirements",
    needs_verification: "needs_verification",
    complete: "complete",
    abandoned: "abandoned",
};
export type AuthSignUpAttemptStatus = (typeof AuthSignUpAttemptStatus)[keyof typeof AuthSignUpAttemptStatus];

export const AuthUserStatus = {
    active: "active",
    inactive: "inactive",
    suspended: "suspended",
};
export type AuthUserStatus = (typeof AuthUserStatus)[keyof typeof AuthUserStatus];

export interface Domain {
    domain: string;
    default: boolean;
    primary: boolean;
    enabled: boolean;
}

export interface EmailAddress {
    id: string;
    userId: string | null | undefined;
    email: string | null | undefined;
    verifiedAt: Date | null | undefined;
    createdAt: Date | string;
    updatedAt: Date | string;
}

export interface AuthInstance {
    id: string;
    projectId: string;
    environment: "development" | "staging" | "production";

    identifierName: boolean;
    identifierEmailAddress: boolean;
    identifierPhoneNumber: boolean;
    identifierUsername: boolean;
    strategy: AuthenticationStrategy;

    publicKey: string;

    nameRequired: boolean;
    emailAddressRequired: boolean;
    phoneNumberRequired: boolean;
    usernameRequired: boolean;

    emailVerificationRequired: boolean;
    phoneVerificationRequired: boolean;

    emailSignInEnabled: boolean;
    phoneSignInEnabled: boolean;

    emailVerificationLinkEnabled: boolean;
    emailVerificationCodeEnabled: boolean;
    smsVerificationEnabled: boolean;

    mfaSMSEnabled: boolean;
    mfaAuthenticatorEnabled: boolean;
    mfaSecurityKeyEnabled: boolean;

    brandingApplicationName: string | null | undefined;
    brandingApplicationLogoUri: string | null | undefined;
    brandingApplicationIconUri: string | null | undefined;
    brandingApplicationFaviconUri: string | null | undefined;

    hideProtocolBranding: boolean;

    theme: Partial<Theme>;

    domains: Domain[];

    socialProviders: SocialProvider[];

    homeUri: string;
    frontendApiUri: string;
    signUpUri: string;
    signInRedirectUri: string;
    signInUri: string;
    signUpRedirectUri: string;
    logoutRedirectUri: string;
    userSettingsUri: string;
    organizationSettingsUri: string;
    createOrganizationUri: string;
    createOrganizationRedirectUri: string;

    allowedIdentifierTypes: AllowedIdentifierType[];
    allowedFirstFactorStrategies: AllowedFirstFactorStrategy[];
    allowedSecondFactorStrategies: (AllowedFirstFactorStrategy | AllowedSecondFactorStrategy)[];

    createdAt: Date | string;
    updatedAt: Date | string;
}

export interface PhoneNumber {
    id: string;
    userId: string | null | undefined;
    phone: string | null | undefined;
    verifiedAt: Date | null | undefined;
    createdAt: Date | string;
    updatedAt: Date | string;
}

export interface Session {
    id: string;
    browser: string | null | undefined;
    device: string | null | undefined;
    engine: string | null | undefined;
    os: string | null | undefined;
    cpu: string | null | undefined;
    ua: string | null | undefined;
    ip: string | null | undefined;
    userId: string;
    user?: UserProfile;

    signInAttemptId: string | null | undefined;
    signInAttempt?: SignInAttempt;
    signUpAttemptId: string | null | undefined;
    signUpAttempt?: SignUpAttempt;

    expiresAt: Date | string;
    createdAt: Date | string;
    updatedAt: Date | string;
}

export interface SignUpAttempt {
    id: string;

    userId: string | null | undefined;

    firstName: string | null | undefined;
    lastName: string | null | undefined;
    email: string | null | undefined;
    phone: string | null | undefined;
    username: string | null | undefined;

    strategy: AuthVerificationStrategy;

    status: AuthSignUpAttemptStatus;
    oauthProvider?: InstanceSocialProvider | null | undefined;
    oauthProviderId?: string | null | undefined;

    authorizeUri?: string | undefined;
    redirectUri: string | null | undefined;

    requiredVerifications: string[];
    missingVerifications: string[];
    requiredFields: string[];
    missingFields: string[];

    createdAt: Date | string;
    updatedAt: Date | string;
}

export const AuthSocialConnectionStatus = {
    created: "created",
    active: "active",
    disconnected: "disconnected",
};
export type AuthSocialConnectionStatus = (typeof AuthSocialConnectionStatus)[keyof typeof AuthSocialConnectionStatus];

export interface SocialConnection {
    id: string;

    status: AuthSocialConnectionStatus;
    userId: string;
    providerId: string | null;
    scope: string | null;
    accessToken?: string | null;
    refreshToken?: string | null;
    expiresAt?: Date | null;

    instanceSocialProviderId: string;
    instanceSocialProvider: SocialProvider;

    createdAt: Date | string;
    updatedAt: Date | string;
}

export interface SocialProvider {
    enabled: boolean;
    providerKey: string;
}

export interface UserProfile {
    id: string;
    firstName: string | null | undefined;
    lastName: string | null | undefined;
    imageUri: string | null | undefined;
    lastSignInAt: Date | null;
    lastActiveAt: Date | null;
    status: any;
    role: string | null | undefined;
    primaryEmailId: string | null | undefined;
    primaryPhoneId: string | null | undefined;
    connections: SocialConnection[];
    emailAddresses: EmailAddress[];
    phoneNumbers: PhoneNumber[];
    featureFlags: FeatureFlag[];
    username?: string | null | undefined;
    timezone?: string | null | undefined;
    locale?: string | null | undefined;
    createdAt: Date | string;
    updatedAt: Date | string;
}
