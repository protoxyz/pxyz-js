import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthOrganizationsUpdateOrganizationResponse = {
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
export type AuthOrganizationsUpdateOrganizationInput = {
    name: string  
    imageUri: string  | string   
    privateMeta: Record<any, any>  
    publicMeta: Record<any, any>  
    slug: string  
};
export function updateOrganization(
    auth: AuthOptions,
    body?: AuthOrganizationsUpdateOrganizationInput,
    options?: RequestOptions<AuthOrganizationsUpdateOrganizationInput>,
    development?: boolean,
): Promise<AuthOrganizationsUpdateOrganizationResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<AuthOrganizationsUpdateOrganizationInput, AuthOrganizationsUpdateOrganizationResponse>(
      auth,
      'PUT',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/auth/organizations/${pathParams.id}',
      options,
  );
}

