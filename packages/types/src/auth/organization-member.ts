import { UserProfile } from "..";
import { Organization } from "./organization";
import { OrganizationRole } from "./organization-role";

export interface OrganizationMember {
    id: string;
    userId: string;
    user?: UserProfile;
    organizationId: string;
    organization?: Organization;
    role: OrganizationRole;
    createdAt: Date | string;
    updatedAt: Date | string;
}
