import { AuthRole, UserProfile } from '..';
import { Organization } from './organization';

export interface OrganizationMember {
  id: string;
  userId: string;
  user?: UserProfile;
  organizationId: string;
  organization?: Organization;
  role: AuthRole;
  createdAt: Date | string;
  updatedAt: Date | string;
}
