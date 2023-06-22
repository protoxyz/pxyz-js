// Contexts & Hooks
import { ProtocolContext } from "./contexts/protocol-context";
import { ProtocolProvider } from "./contexts/protocol-provider";

// Control Components
import { IsLoaded } from "./components/public/control/is-loaded";
import { IsLoggedIn } from "./components/public/control/is-logged-in";
import { IsLoggedOut } from "./components/public/control/is-logged-out";
import { RedirectToSignIn } from "./components/public/control/redirect-to-sign-in";
import { RedirectToSignUp } from "./components/public/control/redirect-to-sign-up";
import { RedirectToUserProfile } from "./components/public/control/redirect-to-user-profile";

// UI Components
import { SignIn } from "./components/public/sign-in";
import { SignUp } from "./components/public/sign-up";
import { ForgotPassword } from "./components/public/forgot-password";
import { UserProfile } from "./components/public/user-profile";
import { OrganizationProfile } from "./components/public/organization-profile";
import { OrganizationSwitcher } from "./components/public/organization-switcher";
import { CreateOrganization } from "./components/public/create-organization";
import { SignInButton } from "./components/public/sign-in-button";
import { SignUpButton } from "./components/public/sign-up-button";
import { SignOutButton } from "./components/public/sign-out-button";
import { UserButton } from "./components/public/user-button";

// Localizations
import { enUS } from "./localizations/en-US";

// Custom hooks
import { useProtocolAuthLogout } from "./hooks/useProtocolAuthLogout";
import { useProtocolAuthOrganizationsList } from "./hooks/useOrganizationsList";

export {
    // Control
    IsLoaded,
    IsLoggedIn,
    IsLoggedOut,
    RedirectToSignIn,
    RedirectToSignUp,
    RedirectToUserProfile,

    // Contexts
    ProtocolContext,
    ProtocolProvider,

    // Hooks
    useProtocolAuthLogout,
    useProtocolAuthOrganizationsList,

    // Public
    SignIn,
    SignUp,
    ForgotPassword,
    UserProfile,
    OrganizationProfile,
    OrganizationSwitcher,
    CreateOrganization,
    SignInButton,
    SignUpButton,
    SignOutButton,
    UserButton,

    // Localizations
    enUS,
};
