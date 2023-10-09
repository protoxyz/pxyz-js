import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthOrganizationInvitationsCreateOrganizationInvitationResponse = {
    id: string  
    organizationId: string  
    roleId: string | null 
    email: string | null 
    role: {
    id: string  
    name: string  
    description: string | null 
    permissions: string [] | null 
    tenantId: string  
    _count: {
    users: number  
    members: number  
}  
    createdAt: string  
    updatedAt: string  
} | null 
    acceptedAt: string | null 
    declinedAt: string | null 
    user: {
    id: string  
    name: string | null 
    identifier: string | null 
    imageUri: string | null 
    createdAt: string  
    updatedAt: string  
} | null 
    publicMeta: Record<any, any>  
    privateMeta: Record<any, any>  
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
