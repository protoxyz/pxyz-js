import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthRolesCreateRoleResponse = {
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
export type AuthRolesCreateRoleInput = {
    name: string  
    description: string | null 
    permissions: string [] | null 
    tenantId: string  
};
export function createRole(
    auth: AuthOptions,
    body?: AuthRolesCreateRoleInput,
    options?: RequestOptions<AuthRolesCreateRoleInput>,
    development?: boolean,
): Promise<AuthRolesCreateRoleResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<AuthRolesCreateRoleInput, AuthRolesCreateRoleResponse>(
      auth,
      'POST',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/auth/roles',
      options,
  );
}

