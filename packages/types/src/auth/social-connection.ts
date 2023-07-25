import { AuthSocialConnectionStatus } from './social-connection-status';
import { SocialProvider } from './social-provider';

export interface SocialConnection {
  id: string;

  status: AuthSocialConnectionStatus;
  userId: string;
  providerId: string | null;
  scope: string | null;
  accessToken?: string | null;
  refreshToken?: string | null;
  expiresAt?: Date | null;

  socialProviderId: string;
  socialProvider: SocialProvider;

  createdAt: Date | string;
  updatedAt: Date | string;
}
