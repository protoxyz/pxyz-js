import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthOrganizationsDeleteOrganizationResponse = {
    id: string  
    creatorId: string | null 
    tenantId: string | null 
    slug: string  
    name: string  
    imageUri: string | null 
    privateMeta: Record<any, any>  
    publicMeta: Record<any, any>  
    _count: {
    members: number  
}  
    createdAt: string  
    updatedAt: string  
}
export type AuthOrganizationsDeleteOrganizationInput = undefined;
export function deleteOrganization(
    auth: AuthOptions,
    body?: AuthOrganizationsDeleteOrganizationInput,
    options?: RequestOptions<AuthOrganizationsDeleteOrganizationInput>,
    development?: boolean,
): Promise<AuthOrganizationsDeleteOrganizationResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<AuthOrganizationsDeleteOrganizationInput, AuthOrganizationsDeleteOrganizationResponse>(
      auth,
      'DELETE',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/auth/organizations/${pathParams.id}',
      options,
  );
}

