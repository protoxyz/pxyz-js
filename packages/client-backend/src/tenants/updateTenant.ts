import { request, RequestOptions, AuthOptions } from "../request";
import { SERVERS } from "../servers";

export type TenantsUpdateTenantResponse = {
    id: string  
    name: string  
    slug: string  
    publicKey: string  
    logoId: string | null 
    logoUri: string | null 
    iconId: string | null 
    iconUri: string | null 
    environment: string  
    createdAt: string  
    updatedAt: string  
}

export function updateTenant(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<TenantsUpdateTenantResponse> {
    return request<TenantsUpdateTenantResponse>(
        auth,
        'PUT',
        development ? SERVERS.development : SERVERS.production,
        '/tenants/${pathParams.id}',
        options,
    );
}
