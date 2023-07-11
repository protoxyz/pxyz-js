import { ProtocolThemeVariables } from "./base";

export type AuthElements = {
    cardWrapper?: string;
    card?: string;
    cardHeader?: string;
    cardHeaderTitle?: string;
    cardHeaderDescription?: string;
    cardContent?: string;
    cardFooter?: string;
};

export type AuthLayout = {
    brandName?: string;
    logoPlacement?: "inside" | "outside" | "none";
    logoImageUrl?: string | null;
    socialButtonsVariant?: "auto" | "button" | "icon";
    socialButtonsPlacement?: "top" | "bottom" | "none";
    showOptionalFields?: boolean;
    showCopyrightAndTerms?: boolean;
    tosUrl?: string | null;
    privacyPolicyUrl?: string | null;
    helpUrl?: string | null;
};

export type AuthTheme = {
    // base theme
    base?: AuthAppearance<AuthTheme>;

    // Override the layout properties
    layout?: AuthLayout;

    // Override any variable
    variables?: ProtocolThemeVariables;

    // Override any element
    elements?: AuthElements;
};

export type AuthAppearance<T = AuthTheme> = T & {
    // Overrides the <SignIn /> component theme
    signIn?: T;

    // Overrides the <SignUp /> component theme
    signUp?: T;

    // Overrides the <UserButton /> component theme
    userButton?: T;

    // Overrides the <UserProfile /> component theme
    userProfile?: T;

    // Overrides the <OrganizationSwitcher /> component theme
    organizationSwitcher?: T;

    // Overrides the <OrganizationProfile /> component theme
    organizationProfile?: T;

    // Overrides the <OrganizationCreate /> component theme
    organizationCreate?: T;
};
