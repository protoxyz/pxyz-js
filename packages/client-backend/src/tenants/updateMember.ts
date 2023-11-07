import { request, RequestOptions, AuthOptions } from "../request";
import { SERVERS } from "../servers";

export type TenantsUpdateMemberResponse = {
    id: string  
    tenantId: string  
    userId: string  
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

export type TenantsUpdateMemberInput = {
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

export function updateMember(
    auth: AuthOptions,
    body?: TenantsUpdateMemberInput,
    options?: RequestOptions<TenantsUpdateMemberInput>,
    development?: boolean,
): Promise<TenantsUpdateMemberResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
    return request<TenantsUpdateMemberInput, TenantsUpdateMemberResponse>(
        auth,
        'PATCH',
        isDevelopment ? SERVERS.development : SERVERS.production,
        '/tenants/members/${pathParams.id}',
        {...options, body},
    );
}
