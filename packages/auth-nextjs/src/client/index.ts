export {
    // Providers
    ProtocolAuthProvider,

    // Hooks
    useProtocolAuth,
    useProtocolAuthInstance,
    useProtocolAuthAppearance,

    // Control
    IsLoggedIn,
    IsLoggedOut,
    IsLoaded,
    RedirectToSignIn,
    RedirectToSignUp,
    RedirectToUserProfile,

    // UI
    SignIn,
    SignUp,
    SignInButton,
    SignUpButton,
    SignOutButton,
    ForgotPassword,
    UserProfile,
    UserButton,
    OrganizationProfile,
    OrganizationSwitcher,
    CreateOrganization,
} from "@protoxyz/auth-react";

const tailwindPaths = "./node_modules/@protoxyz/auth-next/node_modules/@protoxyz/auth-react/dist/index.js";

export { tailwindPaths };
