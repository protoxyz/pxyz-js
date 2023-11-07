import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthOrganizationMembersDeleteOrganizationMemberResponse = {
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
}
export type AuthOrganizationMembersDeleteOrganizationMemberInput = undefined;
export function deleteOrganizationMember(
    auth: AuthOptions,
    body?: AuthOrganizationMembersDeleteOrganizationMemberInput,
    options?: RequestOptions<AuthOrganizationMembersDeleteOrganizationMemberInput>,
    development?: boolean,
): Promise<AuthOrganizationMembersDeleteOrganizationMemberResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<AuthOrganizationMembersDeleteOrganizationMemberInput, AuthOrganizationMembersDeleteOrganizationMemberResponse>(
      auth,
      'DELETE',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/auth/organization-members/${pathParams.id}',
      options,
  );
}

