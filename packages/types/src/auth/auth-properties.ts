export interface AuthProperties {
  id: string;
  tenantId: string;

  // strategy
  strategyUsernamePasswordEnabled: boolean;
  strategyEmailPasswordEnabled: boolean;
  strategyEmailLinkEnabled: boolean;
  strategyEmailCodeEnabled: boolean;
  strategyPhoneCodeEnabled: boolean;
  strategyPhonePasswordEnabled: boolean;
  strategyOAuthEnabled: boolean;
  strategyAuthenticatorCodeEnabled: boolean;
  strategySecurityKeyEnabled: boolean;

  passwordsEnabled: boolean;
  emailSignInEnabled: boolean;
  phoneSignInEnabled: boolean;
  usernameSignInEnabled: boolean;

  nameRequired: boolean;
  emailRequired: boolean;
  phoneRequired: boolean;
  usernameRequired: boolean;
  passwordRequired: boolean;

  emailVerificationRequired: boolean;
  phoneVerificationRequired: boolean;

  emailVerificationCodeEnabled: boolean;
  emailVerificationLinkEnabled: boolean;
  phoneVerificationCodeEnabled: boolean;

  // Session Properties
  sessionMaximumLifetimeEnabled: boolean;
  sessionMaximumLifetime: number;
  sessionInactivityTimeoutEnabled: boolean;
  sessionInactivityTimeout: number;
  sessionTemplate: string | undefined;

  // URLs
  homeUri: string;
  signUpUri: string;
  signInRedirectUri: string;
  signInUri: string;
  signUpRedirectUri: string;
  logoutRedirectUri: string;
  userSettingsUri: string;
  organizationSettingsUri: string;
  createOrganizationUri: string;
  createOrganizationRedirectUri: string;

  createdAt: Date | string;
  updatedAt: Date | string;
}
