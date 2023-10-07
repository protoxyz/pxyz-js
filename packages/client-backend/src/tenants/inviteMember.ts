import { request, RequestOptions, AuthOptions } from "../request";
import { SERVERS } from "../servers";

export type TenantsInviteMemberResponse = {
    id: string
    tenantId: string
    email: string
    userId: string
    user: {
    id: string
    emailAddresses: {
    id: string
    email: string
    verifiedAt: string
}[]
    primaryEmailId: string
    name: string
}
    roleAdmin: boolean
    roleEditOrganizations: boolean
    roleEditUsers: boolean
    roleEditConfig: boolean
    roleViewUsers: boolean
    roleViewOrganizations: boolean
    roleViewConfig: boolean
    roleViewBilling: boolean
    roleEditBilling: boolean
    createdAt: string
    updatedAt: string
}

export function inviteMember(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<TenantsInviteMemberResponse> {
    return request<TenantsInviteMemberResponse>(
        auth,
        'POST',
        development ? SERVERS.development : SERVERS.production,
        '/tenants/members/invite',
        options,
    );
}
