import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthOrganizationsGetOrganizationResponse = {
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
export type AuthOrganizationsGetOrganizationInput = undefined;
export function getOrganization(
    auth: AuthOptions,
    body?: AuthOrganizationsGetOrganizationInput,
    options?: RequestOptions<AuthOrganizationsGetOrganizationInput>,
    development?: boolean,
): Promise<AuthOrganizationsGetOrganizationResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<AuthOrganizationsGetOrganizationInput, AuthOrganizationsGetOrganizationResponse>(
      auth,
      'GET',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/auth/organizations/${pathParams.id}',
      options,
  );
}

