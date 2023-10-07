import { request, RequestOptions, AuthOptions } from "../request";
import { SERVERS } from "../servers";

export type OrganizationInvitationsListOrganizationInvitationsResponse = {
    status: string  
    error: string | null 
    data: {
    id: string  
    organizationId: string  
    email: string | null 
    phone: string | null 
    userId: string | null 
    roleId: string  
    acceptedAt: string | null 
    declinedAt: string | null 
    createdAt: string  
    updatedAt: string  
}[]  
    meta: {
    total: number  
    count: number  
    numPages: number  
    perPage: number  
    prev: string | null 
    next: string | null 
}  
}

export function listOrganizationInvitations(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<OrganizationInvitationsListOrganizationInvitationsResponse> {
    return request<OrganizationInvitationsListOrganizationInvitationsResponse>(
        auth,
        'GET',
        development ? SERVERS.development : SERVERS.production,
        '/organizations/${pathParams.organizationId}/invitations',
        options,
    );
}
