import { OrganizationWithRole } from '..';
import { EmailAddress } from './email-address';
import { FeatureFlag } from './feature-flag';
import { PhoneNumber } from './phone-number';
import { SocialConnection } from './social-connection';

export interface UserProfile {
  id: string;
  firstName: string | null | undefined;
  lastName: string | null | undefined;
  imageUri: string | null | undefined;
  lastSignInAt: Date | null;
  lastActiveAt: Date | null;
  identifier: string;
  status: any;
  role: string | null | undefined;
  primaryEmailId: string | null | undefined;
  primaryPhoneId: string | null | undefined;
  connections: SocialConnection[];
  emailAddresses: EmailAddress[];
  phoneNumbers: PhoneNumber[];
  featureFlags: FeatureFlag[];
  organizations: OrganizationWithRole[];
  username?: string | null | undefined;
  timezone?: string | null | undefined;
  locale?: string | null | undefined;
  createdAt: Date | string;
  updatedAt: Date | string;
}
