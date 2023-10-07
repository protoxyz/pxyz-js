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

export function createRole(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<AuthRolesCreateRoleResponse> {
    return request<AuthRolesCreateRoleResponse>(
        auth,
        'POST',
        development ? SERVERS.development : SERVERS.production,
        '/auth/roles',
        options,
    );
}

