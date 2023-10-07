import { request, RequestOptions, AuthOptions } from "../request";
import { SERVERS } from "../servers";

export type OrganizationsUpdateOrganizationResponse = {
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

export function updateOrganization(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<OrganizationsUpdateOrganizationResponse> {
    return request<OrganizationsUpdateOrganizationResponse>(
        auth,
        'PUT',
        development ? SERVERS.development : SERVERS.production,
        '/user/organizations/${pathParams.organizationId}',
        options,
    );
}
