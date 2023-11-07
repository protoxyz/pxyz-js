import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthOrganizationMembersListOrganizationMembersResponse = {
    status: string  
    data: {
    id: string  
    organizationId: string  
    userId: string  
    roleId: string | null 
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
    user: {
    id: string  
    name: string  
    identifier: string  
    imageUri: string | null 
    createdAt: string  
    updatedAt: string  
}  
    publicMeta: Record<any, any>  
    privateMeta: Record<any, any>  
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
export type AuthOrganizationMembersListOrganizationMembersInput = undefined;
export function listOrganizationMembers(
    auth: AuthOptions,
    body?: AuthOrganizationMembersListOrganizationMembersInput,
    options?: RequestOptions<AuthOrganizationMembersListOrganizationMembersInput>,
    development?: boolean,
): Promise<AuthOrganizationMembersListOrganizationMembersResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<AuthOrganizationMembersListOrganizationMembersInput, AuthOrganizationMembersListOrganizationMembersResponse>(
      auth,
      'GET',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/organizations/${pathParams.organizationId}/auth/organization-members',
      options,
  );
}

