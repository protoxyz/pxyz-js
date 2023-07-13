export type BaseRedirectAndOpenProps = {
  redirectUrl?: string;
  afterSignInUrl?: string;
  afterSignUpUrl?: string;
};

export type OpenSignInProps = BaseRedirectAndOpenProps;
export type OpenSignUpProps = BaseRedirectAndOpenProps;
export type RedirectToSignInProps = BaseRedirectAndOpenProps;
export type RedirectToSignUpProps = BaseRedirectAndOpenProps;
