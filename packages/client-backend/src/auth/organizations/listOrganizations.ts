import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthOrganizationsListOrganizationsResponse = {
    status: string  
    data: {
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
export type AuthOrganizationsListOrganizationsInput = undefined;
export function listOrganizations(
    auth: AuthOptions,
    body?: AuthOrganizationsListOrganizationsInput,
    options?: RequestOptions<AuthOrganizationsListOrganizationsInput>,
    development?: boolean,
): Promise<AuthOrganizationsListOrganizationsResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<AuthOrganizationsListOrganizationsInput, AuthOrganizationsListOrganizationsResponse>(
      auth,
      'GET',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/tenants/${pathParams.tenantId}/auth/organizations',
      options,
  );
}

