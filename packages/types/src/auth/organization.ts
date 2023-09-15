import { OrganizationMember, OrganizationRole } from '..';

export interface Organization {
  id: string;
  name: string;
  slug: string;

  logoId: string | null;
  logoUrl: string | null;
  iconId: string | null;
  iconUrl: string | null;

  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface OrganizationMembershipWithRole extends OrganizationMember {
  role: OrganizationRole;
}

export interface OrganizationWithRole extends Organization {
  membership: OrganizationMembershipWithRole;
}
