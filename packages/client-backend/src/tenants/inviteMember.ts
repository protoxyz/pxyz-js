import { request, RequestOptions, AuthOptions } from "../request";
import { SERVERS } from "../servers";

export type TenantsInviteMemberResponse = {
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

export type TenantsInviteMemberInput = {
    tenantId: string  
    email: string  
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

export function inviteMember(
    auth: AuthOptions,
    body?: TenantsInviteMemberInput,
    options?: RequestOptions<TenantsInviteMemberInput>,
    development?: boolean,
): Promise<TenantsInviteMemberResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
    return request<TenantsInviteMemberInput, TenantsInviteMemberResponse>(
        auth,
        'POST',
        isDevelopment ? SERVERS.development : SERVERS.production,
        '/tenants/members/invite',
        {...options, body},
    );
}
