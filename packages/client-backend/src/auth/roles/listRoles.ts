import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthRolesListRolesResponse = {
    status: string  
    data: {
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
export type AuthRolesListRolesInput = undefined;
export function listRoles(
    auth: AuthOptions,
    body?: AuthRolesListRolesInput,
    options?: RequestOptions<AuthRolesListRolesInput>,
    development?: boolean,
): Promise<AuthRolesListRolesResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<AuthRolesListRolesInput, AuthRolesListRolesResponse>(
      auth,
      'GET',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/auth/tenants/${pathParams.tenantId}/roles',
      options,
  );
}

