import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthOrganizationMembersGetOrganizationMemberResponse = {
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
export type AuthOrganizationMembersGetOrganizationMemberInput = undefined;
export function getOrganizationMember(
    auth: AuthOptions,
    body?: AuthOrganizationMembersGetOrganizationMemberInput,
    options?: RequestOptions<AuthOrganizationMembersGetOrganizationMemberInput>,
    development?: boolean,
): Promise<AuthOrganizationMembersGetOrganizationMemberResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<AuthOrganizationMembersGetOrganizationMemberInput, AuthOrganizationMembersGetOrganizationMemberResponse>(
      auth,
      'GET',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/auth/organization-members/${pathParams.id}',
      options,
  );
}

