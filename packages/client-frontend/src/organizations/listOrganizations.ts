import { request, RequestOptions, AuthOptions } from "../request";
import { SERVERS } from "../servers";

export type OrganizationsListOrganizationsResponse = {
    status: string  
    error: string | null 
    data: {
    id: string  
    name: string  
    slug: string  
    description: string | null 
    logoUri: string | null 
    iconUri: string | null 
    createdAt: string  | string   
    updatedAt: string  | string   
    membership: {
    id: string  
    roleId: string | null 
    role: {
    name: string  
    description: string | null 
    permissions: string [] | null 
} | null 
}  
}[]  
    meta: {
    total: number  
    count: number  
    numPages: number  
    perPage: number  
    prev: string | null 
    next: string | null 
}  
}

export function listOrganizations(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<OrganizationsListOrganizationsResponse> {
    return request<OrganizationsListOrganizationsResponse>(
        auth,
        'GET',
        development ? SERVERS.development : SERVERS.production,
        '/user/organizations',
        options,
    );
}
