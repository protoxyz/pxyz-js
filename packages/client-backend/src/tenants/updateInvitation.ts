import { request, RequestOptions, AuthOptions } from "../request";
import { SERVERS } from "../servers";

export type TenantsUpdateInvitationResponse = {
    id: string  
    tenantId: string  
    email: string  
    userId: string | null 
    user: {
    id: string  
    emailAddresses: {
    id: string  
    email: string  
    verifiedAt: string | null 
}[]  
    primaryEmailId: string | null 
    name: string  
} | null 
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

export function updateInvitation(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<TenantsUpdateInvitationResponse> {
    return request<TenantsUpdateInvitationResponse>(
        auth,
        'PATCH',
        development ? SERVERS.development : SERVERS.production,
        '/tenants/invitations/${pathParams.id}',
        options,
    );
}
