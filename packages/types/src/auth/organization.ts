import { OrganizationMember, OrganizationRole } from "..";

export interface Organization {
    id: string;
    name: string;
    slug: string;
    imageUri?: string | null | undefined;
    createdAt: Date | string;
    updatedAt: Date | string;
}

export interface OrganizationMembershipWithRole extends OrganizationMember {
    role: OrganizationRole;
}

export interface OrganizationWithRole extends Organization {
    membership: OrganizationMembershipWithRole;
}
