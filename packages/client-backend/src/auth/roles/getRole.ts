import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthRolesGetRoleResponse = {
    id: string
    name: string
    description: string
    permissions: string[]
    tenantId: string
    _count: {
    users: number
    members: number
}
    createdAt: string
    updatedAt: string
}

export function getRole(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<AuthRolesGetRoleResponse> {
    return request<AuthRolesGetRoleResponse>(
        auth,
        'GET',
        development ? SERVERS.development : SERVERS.production,
        '/auth/roles/${pathParams.id}',
        options,
    );
}

