import { request, RequestOptions, AuthOptions } from "../request";
import { SERVERS } from "../servers";

export type OrganizationRolesListOrganizationRolesResponse = {
    status: string  
    error: string | null 
    data: {
    id: string  
    name: string  
    description: string | null 
    permissions: string []  
    createdAt: string  
    updatedAt: string  
}[] | null 
    meta: {
    total: number  
    count: number  
    numPages: number  
    perPage: number  
    prev: string | null 
    next: string | null 
} | null 
}

export function listOrganizationRoles(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<OrganizationRolesListOrganizationRolesResponse> {
    return request<OrganizationRolesListOrganizationRolesResponse>(
        auth,
        'GET',
        development ? SERVERS.development : SERVERS.production,
        '/organizations/${pathParams.organizationId}/roles',
        options,
    );
}
