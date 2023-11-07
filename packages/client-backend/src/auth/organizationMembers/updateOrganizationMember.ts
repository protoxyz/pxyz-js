import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthOrganizationMembersUpdateOrganizationMemberResponse = {
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
export type AuthOrganizationMembersUpdateOrganizationMemberInput = {
    roleId: string | null 
    privateMeta: any | null 
    publicMeta: any | null 
};
export function updateOrganizationMember(
    auth: AuthOptions,
    body?: AuthOrganizationMembersUpdateOrganizationMemberInput,
    options?: RequestOptions<AuthOrganizationMembersUpdateOrganizationMemberInput>,
    development?: boolean,
): Promise<AuthOrganizationMembersUpdateOrganizationMemberResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<AuthOrganizationMembersUpdateOrganizationMemberInput, AuthOrganizationMembersUpdateOrganizationMemberResponse>(
      auth,
      'PUT',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/auth/organization-members/${pathParams.id}',
      options,
  );
}

