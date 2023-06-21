interface BaseRedirectAndOpenProps {
    redirectUrl?: string;
    afterSignInUrl?: string;
    afterSignUpUrl?: string;
}

export interface OpenSignInProps extends BaseRedirectAndOpenProps {}
export interface OpenSignUpProps extends BaseRedirectAndOpenProps {}
export interface RedirectToSignInProps extends BaseRedirectAndOpenProps {}
export interface RedirectToSignUpProps extends BaseRedirectAndOpenProps {}
