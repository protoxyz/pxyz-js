import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthRolesUpdateRoleResponse = {
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
export type AuthRolesUpdateRoleInput = {
    name: string  
    description: string | null 
    permissions: string [] | null 
    tenantId: string  
};
export function updateRole(
    auth: AuthOptions,
    body?: AuthRolesUpdateRoleInput,
    options?: RequestOptions<AuthRolesUpdateRoleInput>,
    development?: boolean,
): Promise<AuthRolesUpdateRoleResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<AuthRolesUpdateRoleInput, AuthRolesUpdateRoleResponse>(
      auth,
      'PUT',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/auth/roles/${pathParams.id}',
      options,
  );
}

