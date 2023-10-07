import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthRolesListRolesResponse = {
    status: string
    data: {
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
}[]
    meta: {
    total: number
    count: number
    numPages: number
    perPage: number
    prev: string
    next: string
}
}

export function listRoles(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<AuthRolesListRolesResponse> {
    return request<AuthRolesListRolesResponse>(
        auth,
        'GET',
        development ? SERVERS.development : SERVERS.production,
        '/auth/tenants/${pathParams.tenantId}/roles',
        options,
    );
}

