import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthOrganizationInvitationsGetOrganizationInvitationResponse = {
    id: string  
    organizationId: string  
    roleId: string | null 
    email: string | null 
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
    acceptedAt: string | null 
    declinedAt: string | null 
    user: {
    id: string  
    name: string | null 
    identifier: string | null 
    imageUri: string | null 
    createdAt: string  
    updatedAt: string  
} | null 
    publicMeta: Record<any, any>  
    privateMeta: Record<any, any>  
    createdAt: string  
    updatedAt: string  
}
export type AuthOrganizationInvitationsGetOrganizationInvitationInput = undefined;
export function getOrganizationInvitation(
    auth: AuthOptions,
    body?: AuthOrganizationInvitationsGetOrganizationInvitationInput,
    options?: RequestOptions<AuthOrganizationInvitationsGetOrganizationInvitationInput>,
    development?: boolean,
): Promise<AuthOrganizationInvitationsGetOrganizationInvitationResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<AuthOrganizationInvitationsGetOrganizationInvitationInput, AuthOrganizationInvitationsGetOrganizationInvitationResponse>(
      auth,
      'GET',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/auth/organization-invitations/${pathParams.id}',
      options,
  );
}

