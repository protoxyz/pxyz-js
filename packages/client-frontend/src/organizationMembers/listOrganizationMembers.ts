import { request, RequestOptions, AuthOptions } from "../request";
import { SERVERS } from "../servers";

export type OrganizationMembersListOrganizationMembersResponse = {
    status: string  
    error: string | null 
    data: {
    id: string  
    organizationId: string  
    userId: string  
    roleId: string | null 
    role: {
    id: string  
    name: string  
    description: string | null 
    permissions: string [] | null 
} | null 
    user: {
    id: string  
    name: string  
    identifier: string  
    imageUri: string | null 
    createdAt: string  
    updatedAt: string  
}  
    publicMeta: Record<any, any>  
    privateMeta: Record<any, any>  
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

export function listOrganizationMembers(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<OrganizationMembersListOrganizationMembersResponse> {
    return request<OrganizationMembersListOrganizationMembersResponse>(
        auth,
        'GET',
        development ? SERVERS.development : SERVERS.production,
        '/user/organizations/${pathParams.orgId}/members',
        options,
    );
}
