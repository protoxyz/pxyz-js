import {
  AllowedFirstFactorStrategy,
  AllowedIdentifierType,
  AllowedSecondFactorStrategy,
} from '..';
import { Domain } from '../platform/domain';
import { AuthenticationStrategy } from './authentication-strategy';
import { SocialProvider } from './social-provider';

export interface AuthInstance {
  id: string;
  projectId: string;
  environment: 'development' | 'staging' | 'production';

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
  usernameSignInEnabled: boolean;

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

  // theme: Partial<Theme>;

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
  allowedSecondFactorStrategies: (
    | AllowedFirstFactorStrategy
    | AllowedSecondFactorStrategy
  )[];

  createdAt: Date | string;
  updatedAt: Date | string;
}
