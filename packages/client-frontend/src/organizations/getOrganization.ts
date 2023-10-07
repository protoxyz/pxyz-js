import { request, RequestOptions, AuthOptions } from "../request";
import { SERVERS } from "../servers";

export type OrganizationsGetOrganizationResponse = {
    status: string  
    error: string | null 
    data: {
    organization: {
    id: string  
    name: string  
    slug: string  
    description: string | null 
    logoUri: string | null 
    iconUri: string | null 
    createdAt: string  | string   
    updatedAt: string  | string   
} | null 
} | null 
}

export function getOrganization(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<OrganizationsGetOrganizationResponse> {
    return request<OrganizationsGetOrganizationResponse>(
        auth,
        'GET',
        development ? SERVERS.development : SERVERS.production,
        '/user/organizations/${pathParams.organizationId}',
        options,
    );
}
