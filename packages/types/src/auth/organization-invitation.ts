import { AuthRole } from '..';
import { Organization } from './organization';

export interface OrganizationInvitation {
  id: string;
  organizationId: string;
  organization?: Organization;
  email?: string;
  phone?: string;
  role: AuthRole;
  createdAt: Date | string;
  updatedAt: Date | string;
}
