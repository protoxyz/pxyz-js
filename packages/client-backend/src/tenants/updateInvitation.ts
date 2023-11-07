import { request, RequestOptions, AuthOptions } from "../request";
import { SERVERS } from "../servers";

export type TenantsUpdateInvitationResponse = {
    id: string  
    tenantId: string  
    tenant: {
    id: string  
    name: string  
    slug: string  
    logoId: string | null 
    iconId: string | null 
    environment: string  
    createdAt: string  
} | null 
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
    name: string | null 
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

export type TenantsUpdateInvitationInput = {
    roleAdmin: boolean  
    roleEditOrganizations: boolean  
    roleEditUsers: boolean  
    roleEditConfig: boolean  
    roleViewUsers: boolean  
    roleViewOrganizations: boolean  
    roleViewConfig: boolean  
    roleViewBilling: boolean  
    roleEditBilling: boolean  
};

export function updateInvitation(
    auth: AuthOptions,
    body?: TenantsUpdateInvitationInput,
    options?: RequestOptions<TenantsUpdateInvitationInput>,
    development?: boolean,
): Promise<TenantsUpdateInvitationResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
    return request<TenantsUpdateInvitationInput, TenantsUpdateInvitationResponse>(
        auth,
        'PATCH',
        isDevelopment ? SERVERS.development : SERVERS.production,
        '/tenants/invitations/${pathParams.id}',
        {...options, body},
    );
}
