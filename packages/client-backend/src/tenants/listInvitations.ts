import { request, RequestOptions, AuthOptions } from "../request";
import { SERVERS } from "../servers";

export type TenantsListInvitationsResponse = {
    status: string  
    data: {
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

export type TenantsListInvitationsInput = undefined;

export function listInvitations(
    auth: AuthOptions,
    body?: TenantsListInvitationsInput,
    options?: RequestOptions<TenantsListInvitationsInput>,
    development?: boolean,
): Promise<TenantsListInvitationsResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
    return request<TenantsListInvitationsInput, TenantsListInvitationsResponse>(
        auth,
        'GET',
        isDevelopment ? SERVERS.development : SERVERS.production,
        '/tenants/${pathParams.tenantId}/invitations',
        {...options, body},
    );
}
