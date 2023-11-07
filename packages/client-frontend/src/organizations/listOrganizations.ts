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

export type OrganizationsListOrganizationsInput = undefined;

export function listOrganizations(
    auth: AuthOptions,
    body?: OrganizationsListOrganizationsInput,
    options?: RequestOptions<OrganizationsListOrganizationsInput>,
    development?: boolean,
): Promise<OrganizationsListOrganizationsResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
    return request<OrganizationsListOrganizationsInput, OrganizationsListOrganizationsResponse>(
        auth,
        'GET',
        isDevelopment ? SERVERS.development : SERVERS.production,
        '/user/organizations',
        {...options, body},
    );
}
