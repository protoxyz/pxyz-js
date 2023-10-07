import { request, RequestOptions, AuthOptions } from "../request";
import { SERVERS } from "../servers";

export type OrganizationsCreateOrganizationResponse = {
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
}  
}

export function createOrganization(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<OrganizationsCreateOrganizationResponse> {
    return request<OrganizationsCreateOrganizationResponse>(
        auth,
        'POST',
        development ? SERVERS.development : SERVERS.production,
        '/user/organizations',
        options,
    );
}
