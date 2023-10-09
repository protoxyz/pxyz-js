import { AuthRole, OrganizationMember } from '..';

export interface Organization {
  id: string;
  name: string;
  slug: string;

  logoId: string | null;
  logoUri: string | null;
  iconId: string | null;
  iconUri: string | null;

  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface OrganizationMembershipWithRole extends OrganizationMember {
  role: AuthRole;
}

export interface OrganizationWithRole extends Organization {
  membership: OrganizationMembershipWithRole;
}
