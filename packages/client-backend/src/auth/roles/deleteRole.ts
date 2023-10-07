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

export function deleteRole(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<AuthRolesDeleteRoleResponse> {
    return request<AuthRolesDeleteRoleResponse>(
        auth,
        'DELETE',
        development ? SERVERS.development : SERVERS.production,
        '/auth/roles/${pathParams.id}',
        options,
    );
}

