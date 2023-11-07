import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthOrganizationsCreateOrganizationResponse = {
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
export type AuthOrganizationsCreateOrganizationInput = {
    tenantId: string  
    name: string  
    slug: string  
    imageUri: string  | string   
    privateMeta: Record<any, any>  
    publicMeta: Record<any, any>  
};
export function createOrganization(
    auth: AuthOptions,
    body?: AuthOrganizationsCreateOrganizationInput,
    options?: RequestOptions<AuthOrganizationsCreateOrganizationInput>,
    development?: boolean,
): Promise<AuthOrganizationsCreateOrganizationResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<AuthOrganizationsCreateOrganizationInput, AuthOrganizationsCreateOrganizationResponse>(
      auth,
      'POST',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/auth/organizations',
      options,
  );
}

