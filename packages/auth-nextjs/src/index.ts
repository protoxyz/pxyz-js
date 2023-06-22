import {
    // Contexts & Hooks
    ProtocolContext,
    ProtocolProvider,

    // Hooks
    useProtocolAuthLogout,
    useProtocolAuthOrganizationsList,

    // Control
    IsLoaded,
    IsLoggedIn,
    IsLoggedOut,
    RedirectToSignIn,
    RedirectToSignUp,
    RedirectToUserProfile,

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
} from "@protoxyz/react";

import { ProtocolAuthProviderRSC } from "./server/protocol-provider-rsc";
import { getUser, getAuth, getToken } from "./server/getUser";

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

export { ProtocolAuthProviderRSC };
export { getUser, getAuth, getToken };
