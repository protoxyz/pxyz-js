import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthRolesDeleteRoleResponse = {
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
export type AuthRolesDeleteRoleInput = undefined;
export function deleteRole(
    auth: AuthOptions,
    body?: AuthRolesDeleteRoleInput,
    options?: RequestOptions<AuthRolesDeleteRoleInput>,
    development?: boolean,
): Promise<AuthRolesDeleteRoleResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<AuthRolesDeleteRoleInput, AuthRolesDeleteRoleResponse>(
      auth,
      'DELETE',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/auth/roles/${pathParams.id}',
      options,
  );
}

