import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthOrganizationInvitationsCreateOrganizationInvitationResponse = {
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
}

export function createOrganizationInvitation(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<AuthOrganizationInvitationsCreateOrganizationInvitationResponse> {
    return request<AuthOrganizationInvitationsCreateOrganizationInvitationResponse>(
        auth,
        'POST',
        development ? SERVERS.development : SERVERS.production,
        '/auth/organization-invitations',
        options,
    );
}

