import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthOrganizationInvitationsListOrganizationInvitationsResponse = {
    status: string
    data: {
    id: string
    organizationId: string
    roleId: string
    email: string
    role: {
    id: string
    name: string
    description: string
    permissions: string[]
    tenantId: string
    _count: {
    users: number
    members: number
}
    createdAt: string
    updatedAt: string
}
    acceptedAt: string
    declinedAt: string
    user: {
    id: string
    name: string
    identifier: string
    imageUri: string
    createdAt: string
    updatedAt: string
}
    publicMeta: undefined
    privateMeta: undefined
    createdAt: string
    updatedAt: string
}[]
    meta: {
    total: number
    count: number
    numPages: number
    perPage: number
    prev: string
    next: string
}
}

export function listOrganizationInvitations(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<AuthOrganizationInvitationsListOrganizationInvitationsResponse> {
    return request<AuthOrganizationInvitationsListOrganizationInvitationsResponse>(
        auth,
        'GET',
        development ? SERVERS.development : SERVERS.production,
        '/auth/organizations/${pathParams.organizationId}/organization-invitations',
        options,
    );
}

