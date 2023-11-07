import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthOrganizationInvitationsListOrganizationInvitationsResponse = {
    status: string  
    data: {
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
export type AuthOrganizationInvitationsListOrganizationInvitationsInput = undefined;
export function listOrganizationInvitations(
    auth: AuthOptions,
    body?: AuthOrganizationInvitationsListOrganizationInvitationsInput,
    options?: RequestOptions<AuthOrganizationInvitationsListOrganizationInvitationsInput>,
    development?: boolean,
): Promise<AuthOrganizationInvitationsListOrganizationInvitationsResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<AuthOrganizationInvitationsListOrganizationInvitationsInput, AuthOrganizationInvitationsListOrganizationInvitationsResponse>(
      auth,
      'GET',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/auth/organizations/${pathParams.organizationId}/organization-invitations',
      options,
  );
}

