import { AuthRole, OrganizationWithRole } from '..';
import { EmailAddress } from './email-address';
import { PhoneNumber } from './phone-number';
import { SocialConnection } from './social-connection';

export interface UserProfile {
  id: string;
  name: string | null | undefined;
  imageUri: string | null | undefined;
  imageId: string | null | undefined;
  lastSignInAt: Date | null;
  lastActiveAt: Date | null;
  identifier: string;
  status: any;
  role: AuthRole | null | undefined;
  primaryEmailId: string | null | undefined;
  primaryPhoneId: string | null | undefined;
  connections: SocialConnection[];
  emailAddresses: EmailAddress[];
  phoneNumbers: PhoneNumber[];
  organizations: OrganizationWithRole[];
  username?: string | null | undefined;
  timezone?: string | null | undefined;
  locale?: string | null | undefined;
  createdAt: Date | string;
  updatedAt: Date | string;
}
