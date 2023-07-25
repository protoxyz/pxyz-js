import { AuthSocialProvider } from './social-provider';
import { AuthSignInAttemptStatus } from './sign-in-attempt-status';
import { AuthVerificationStrategy } from './verification-strategy';

export interface SignInAttempt {
  id: string;

  userId: string | null | undefined;

  identifier: string | null | undefined;
  status: AuthSignInAttemptStatus;
  strategy: AuthVerificationStrategy | null | undefined;
  oauthProviderId?: string | null | undefined;
  oauthProvider?: AuthSocialProvider | null | undefined;

  redirectUri: string | null | undefined;
  authorizeUri?: string | undefined;

  createdAt: Date | string;
  updatedAt: Date | string;
}
