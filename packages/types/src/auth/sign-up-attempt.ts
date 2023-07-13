import { AuthSignUpAttemptStatus } from './sign-up-attempt-status';
import { InstanceSocialProvider } from './social-provider';
import { AuthVerificationStrategy } from './verification-strategy';

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
