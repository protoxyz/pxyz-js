import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthOrganizationInvitationsUpdateOrganizationInvitationResponse = {
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
export type AuthOrganizationInvitationsUpdateOrganizationInvitationInput = {
    roleId: string | null 
};
export function updateOrganizationInvitation(
    auth: AuthOptions,
    body?: AuthOrganizationInvitationsUpdateOrganizationInvitationInput,
    options?: RequestOptions<AuthOrganizationInvitationsUpdateOrganizationInvitationInput>,
    development?: boolean,
): Promise<AuthOrganizationInvitationsUpdateOrganizationInvitationResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<AuthOrganizationInvitationsUpdateOrganizationInvitationInput, AuthOrganizationInvitationsUpdateOrganizationInvitationResponse>(
      auth,
      'PUT',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/auth/organization-invitations/${pathParams.id}',
      options,
  );
}

