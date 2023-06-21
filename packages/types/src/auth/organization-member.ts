import { Organization } from "./organization";
import { OrganizationRole } from "./organization-role";
import { SessionUser } from "./session-user";

export interface OrganizationMember {
    id: string;
    userId: string;
    user?: SessionUser;
    organizationId: string;
    organization?: Organization;
    role: OrganizationRole;
    createdAt: Date | string;
    updatedAt: Date | string;
}
