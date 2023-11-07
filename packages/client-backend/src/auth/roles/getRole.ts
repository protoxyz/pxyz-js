import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthRolesGetRoleResponse = {
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
}
export type AuthRolesGetRoleInput = undefined;
export function getRole(
    auth: AuthOptions,
    body?: AuthRolesGetRoleInput,
    options?: RequestOptions<AuthRolesGetRoleInput>,
    development?: boolean,
): Promise<AuthRolesGetRoleResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<AuthRolesGetRoleInput, AuthRolesGetRoleResponse>(
      auth,
      'GET',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/auth/roles/${pathParams.id}',
      options,
  );
}

