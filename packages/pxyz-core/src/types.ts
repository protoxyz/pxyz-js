export interface PaginatedMeta {
    total: number;
    count: number;
    numPages: number;
    perPage: number;
    prev?: string | null | undefined;
    next?: string | null | undefined;
}

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

export const ThemeDefaultType = {
    light: "light",
    dark: "dark",
    base: "base",
};
export type ThemeDefaultType = (typeof ThemeDefaultType)[keyof typeof ThemeDefaultType];

export const Environment = {
    development: "development",
    staging: "staging",
    production: "production",
};
export type Environment = (typeof Environment)[keyof typeof Environment];

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

export interface FeatureFlag {
    id?: string;
    key: string;
    value: string;
}

export interface Project {
    id: string;
    organizationId?: string | null | undefined;
    organization?: Organization | null | undefined;
    name: string;
    slug: string;
    imageUri: string | null;
    createdAt: Date | string;
    updatedAt: Date | string;
}

export interface AuthInstanceWithCount
    extends Pick<AuthInstance, "id" | "projectId" | "environment" | "createdAt" | "updatedAt"> {
    _count: {
        users: number;
        organizations: number;
    };
}

export interface ProjectWithInstances extends Project {
    authInstances: AuthInstanceWithCount[];
    organization?: Organization | null | undefined;
}

export interface Organization {
    id: string;
    name: string;
    slug: string;
    imageUri?: string | null | undefined;
    createdAt: Date | string;
    updatedAt: Date | string;
}

export interface OrganizationRole {
    id: string;
    name: string;
    slug: string;
    createdAt: Date | string;
    updatedAt: Date | string;
}

export interface OrganizationMember {
    id: string;
    userId: string;
    user?: SessionUser;
    organizationId: string;
    organization?: Organization;
    role: OrganizationRole;
    createdAt: Date | string;
    updatedAt: Date | string;
}

export interface OrganizationInvitation {
    id: string;
    organizationId: string;
    organization?: Organization;
    email?: string;
    phone?: string;
    role: OrganizationRole;
    createdAt: Date | string;
    updatedAt: Date | string;
}

export interface OrganizationWithProjects extends Organization {
    projects: ProjectWithInstances[];
}
export const StackRegion = {
    ohio: "ohio",
    virginia: "virginia",
    california: "california",
    oregon: "oregon",
    africa: "africa",
    asiaPacificHongKong: "asiaPacificHongKong",
    asiaPacificHyderabad: "asiaPacificHyderabad",
    asiaPacificJakarta: "asiaPacificJakarta",
    asiaPacificMelbourne: "asiaPacificMelbourne",
    asiaPacificMumbai: "asiaPacificMumbai",
    asiaPacificOsaka: "asiaPacificOsaka",
    asiaPacificSeoul: "asiaPacificSeoul",
    asiaPacificSingapore: "asiaPacificSingapore",
    asiaPacificSydney: "asiaPacificSydney",
    asiaPacificTokyo: "asiaPacificTokyo",
    canadaCentral: "canadaCentral",
    europeFrankfort: "europeFrankfort",
    europeIreland: "europeIreland",
    europeLondon: "europeLondon",
    europeMilan: "europeMilan",
    europeParis: "europeParis",
    europeSpain: "europeSpain",
    europeStockholm: "europeStockholm",
    middleEastBahrain: "middleEastBahrain",
    middleEastUae: "middleEastUae",
    southAmericaSaoPaulo: "southAmericaSaoPaulo",
    awsGovCloudEast: "awsGovCloudEast",
    awsGovCloudWest: "awsGovCloudWest",
};

export type StackRegion = (typeof StackRegion)[keyof typeof StackRegion];

export const StorageProviderType = {
    protocol: "protocol",
    custom_aws: "custom_aws",
};
export type StorageProviderType = (typeof StorageProviderType)[keyof typeof StorageProviderType];

export const StackInfrastructure = {
    protocol: "protocol",
    custom_aws: "custom_aws",
};
export type StackInfrastructure = (typeof StackInfrastructure)[keyof typeof StackInfrastructure];

export const StackServiceStatus = {
    pending: "pending",
    deploying: "deploying",
    failed: "failed",
    ready: "ready",
};
export type StackServiceStatus = (typeof StackServiceStatus)[keyof typeof StackServiceStatus];

export const StackResourceType = {
    database_postgres: "database_postgres",
    cache_redis: "cache_redis",
    cache_mem: "cache_mem",
};
export type StackResourceType = (typeof StackResourceType)[keyof typeof StackResourceType];

export const StackResourceStatus = {
    pending: "pending",
    creating: "creating",
    updating: "updating",
    deleting: "deleting",
    ready: "ready",
    failed: "failed",
};
export type StackResourceStatus = (typeof StackResourceStatus)[keyof typeof StackResourceStatus];

export const StackResourceAvailabilityZoneType = {
    single: "single",
    multi: "multi",
};
export type StackResourceAvailabilityZoneType =
    (typeof StackResourceAvailabilityZoneType)[keyof typeof StackResourceAvailabilityZoneType];

export const StackRepositoryStatus = {
    created: "created",
    cloning: "cloning",
    cloned: "cloned",
    error: "error",
};
export type StackRepositoryStatus = (typeof StackRepositoryStatus)[keyof typeof StackRepositoryStatus];

export interface Theme {
    id: string;
    projectId: string;
    baseType: ThemeDefaultType;
    properties: Partial<ThemeProperties>;
    createdAt: Date | string;
    updatedAt: Date | string;
}

export interface ThemeProperties {
    // Page
    backgroundColor: string;
    backgroundImage: string | null | undefined;

    // Brand
    brandLogo: string | null | undefined;
    brandName: string;

    // Primary
    primaryColor: string;

    linkTextColor: string;

    // Divider
    dividerTextBgColor: string;
    dividerColor: string;
    dividerTextColor: string;

    // Heading
    headingColor: string;
    headingFontSize: string;
    headingFontWeight: string;

    // Subheading
    subheadingColor: string;
    subheadingFontSize: string;
    subheadingFontWeight: string;

    // Header
    headerBgColor: string;
    headerBrandNameColor: string;
    headerBrandLogoFill: string;
    headerBoxShadow: string;

    // UserSettings
    userSettingsBgColor: string;
    userSettingsBorderColor: string;
    userSettingsBoxShadow: string;
    userSettingsBorderRadius: string;

    userSettingsNavBorderColor: string;
    userSettingsNavBorder: string;
    userSettingsTabBgColor: string;
    userSettingsTabTextColor: string;

    userSettingsHeadingColor: string;
    userSettingsSubheadingColor: string;

    // Landing
    landingHeadingColor?: string;
    landingHeadingFontSize?: string;
    landingHeadingFontWeight?: string;

    landingSubheadingColor?: string;
    landingSubheadingFontSize?: string;
    landingSubheadingFontWeight?: string;

    // UserDropdown
    userDropdownBgColor: string;
    userDropdownTextColor: string;
    userDropdownBorderColor: string;
    userDropdownMenuBgColor: string;
    userDropdownMenuTextColor: string;
    userDropdownMenuBorderColor: string;
    userDropdownMenuShadow: string;
    userDropdownMenuDividerColor: string;

    // Input
    inputText: string;
    inputBgColor: string;
    inputBorderColor: string;
    inputBorder: string;
    inputBorderRadius: string;
    inputBoxShadow: string;
    inputPaddingHorizontal: string;
    inputPaddingVertical: string;

    // Label
    labelColor: string;
    labelFontSize: string;
    labelFontWeight: string;

    // Cards
    cardBgColor: string;
    cardBorderColor: string;
    cardBorder: string;
    cardBorderRadius: string;
    cardBoxShadow: string;
    cardPaddingHorizontal: string;
    cardPaddingVertical: string;
    cardHeadingColor: string;
    cardSubheadingColor: string;

    landingCardBgColor?: string;
    landingCardBorderColor?: string;
    landingCardBorder?: string;
    landingCardBorderRadius?: string;
    landingCardBoxShadow?: string;
    landingCardPaddingHorizontal?: string;
    landingCardPaddingVertical?: string;
    landingCardHeadingColor?: string;
    landingCardSubheadingColor?: string;

    signInCardBgColor?: string;
    signInCardBorderColor?: string;
    signInCardBorder?: string;
    signInCardBorderRadius?: string;
    signInCardBoxShadow?: string;
    signInCardPaddingHorizontal?: string;
    signInCardPaddingVertical?: string;
    signInCardHeadingColor?: string;
    signInCardSubheadingColor?: string;

    signUpCardBgColor?: string;
    signUpCardBorderColor?: string;
    signUpCardBorder?: string;
    signUpCardBorderRadius?: string;
    signUpCardBoxShadow?: string;
    signUpCardPaddingHorizontal?: string;
    signUpCardPaddingVertical?: string;
    signUpCardHeadingColor?: string;
    signUpCardSubheadingColor?: string;

    // Buttons
    primaryButtonFontSize: string;
    primaryButtonFontWeight: string;
    primaryButtonBgColor: string;
    primaryButtonTextColor: string;
    primaryButtonBorderColor: string;
    primaryButtonBorder: string;
    primaryButtonBorderRadius: string;
    primaryButtonBoxShadow: string;
    primaryButtonPaddingHorizontal: string;
    primaryButtonPaddingVertical: string;

    secondaryButtonFontSize: string;
    secondaryButtonFontWeight: string;
    secondaryButtonBgColor: string;
    secondaryButtonTextColor: string;
    secondaryButtonBorderColor: string;
    secondaryButtonBorder: string;
    secondaryButtonBorderRadius: string;
    secondaryButtonBoxShadow: string;
    secondaryButtonPaddingHorizontal: string;
    secondaryButtonPaddingVertical: string;

    socialButtonBgColor: string;
    socialButtonBorder: string;
    socialButtonBorderColor: string;
    socialButtonBorderRadius: string;
    socialButtonBoxShadow: string;
    socialButtonPaddingHorizontal: string;
    socialButtonPaddingVertical: string;
    socialButtonIconFill: string;
    socialButtonIconWidth: string;
    socialButtonIconHeight: string;
    socialButtonTextColor: string;
    socialButtonFontSize: string;
    socialButtonFontWeight: string;

    // Secured by
    securedByProtocolBgColor: string;
    securedByProtocolTextColor: string;
    securedByProtocolProtocolColor: string;

    // Actions
    signInActionsLinkColor: string;
    signInActionsLinkSize: string;
    signInActionsLinkWeight: string;
    signUpActionsLinkColor: string;
    signUpActionsLinkSize: string;
    signUpActionsLinkWeight: string;

    // Sign Up
    signUpSubmitText: string;
    signInSubmitText: string;
    verifyText: string;
}

export const StackStatus = {
    pending: "pending",
    creating: "creating",
    created: "created",
    updating: "updating",
    updated: "updated",
    deleting: "deleting",
    deleted: "deleted",
    ready: "ready",
    error: "error",
};
export type StackStatus = (typeof StackStatus)[keyof typeof StackStatus];

export interface Stack {
    id: string;

    projectId: string;
    project?: Project;

    name: string;
    infra: StackInfrastructure;
    region: StackRegion;
    status: StackStatus;
    error: string | null;

    resources: StackResource[];
    services: StackService[];

    createdAt: Date;
    updatedAt: Date;
}

export const StackServicePlatform = {
    node_18: "node_18",
    python_39: "python_39",
    ruby_30: "ruby_30",
    php_80: "php_80",
    go_116: "go_116",
};
export type StackServicePlatform = (typeof StackServicePlatform)[keyof typeof StackServicePlatform];

export interface StackService {
    id: string;

    projectId: string;
    project?: Project | null;

    stackId: string;
    stack?: Stack | null;

    name: string;

    repositoryId: string;
    repository?: StackRepository | null;

    platform: StackServicePlatform;
    path: string;
    installCmd?: string | null;
    buildCmd?: string | null;
    startCmd?: string | null;

    status: StackServiceStatus;
    message?: string | null;
    url?: string | null;
    error?: string | null;

    createdAt: Date;
    updatedAt: Date;
}

export interface StackResource {
    id: string;

    stackId: string;
    stack?: Stack;

    name: string;
    type: StackResourceType;
    cloudTypeId: string;
    cloudResourceId: string;
    status: StackResourceStatus;
    availabilityZoneType: StackResourceAvailabilityZoneType;
    properties: any;
    error?: string | null;

    createdAt: Date;
    updatedAt: Date;
}

export interface StackRepository {
    id: string;

    projectId: string;
    project?: Project | null;

    creatorId: string;
    creator?: UserProfile | null;

    name: string;

    repositoryUri: string;
    status: StackRepositoryStatus;

    starterKitId?: string | null;
    starterKit?: StarterKit | null | undefined;

    error?: string | null;

    services?: StackService[];

    createdAt: Date;
    updatedAt: Date;
}

export interface StarterKit {
    id: string;

    organizationId?: string | null;
    organization?: Organization | null;

    name: string;
    slug: string;
    description?: string | null;
    imageUri?: string | null;
    repositoryUri: string;
    status: StarterKitStatus;
    protocolServices: string[];
    repositories?: StackRepository[] | null | undefined;

    createdAt: Date;
    updatedAt: Date;
}

export const StarterKitStatus = {
    created: "created",
    featured: "featured",
    public: "public",
};
export type StarterKitStatus = (typeof StarterKitStatus)[keyof typeof StarterKitStatus];
