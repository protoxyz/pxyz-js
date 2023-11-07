import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthOrganizationMembersCreateOrganizationMemberResponse = {
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
export type AuthOrganizationMembersCreateOrganizationMemberInput = {
    organizationId: string  
    userId: string  
    roleId: string | null 
    privateMeta: any | null 
    publicMeta: any | null 
};
export function createOrganizationMember(
    auth: AuthOptions,
    body?: AuthOrganizationMembersCreateOrganizationMemberInput,
    options?: RequestOptions<AuthOrganizationMembersCreateOrganizationMemberInput>,
    development?: boolean,
): Promise<AuthOrganizationMembersCreateOrganizationMemberResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<AuthOrganizationMembersCreateOrganizationMemberInput, AuthOrganizationMembersCreateOrganizationMemberResponse>(
      auth,
      'POST',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/auth/organization-members',
      options,
  );
}

