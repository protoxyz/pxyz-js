import { Organization } from './organization';
import { OrganizationRole } from './organization-role';

export interface OrganizationInvitation {
  id: string;
  organizationId: string;
  organization?: Organization;
  email?: string;
  phone?: string;
  role: OrganizationRole;
  createdAt: Date | string;
  updatedAt: Date | string;
}
