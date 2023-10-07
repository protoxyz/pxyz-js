import { request, RequestOptions, AuthOptions } from "../request";
import { SERVERS } from "../servers";

export type TenantsCreateTenantResponse = {
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

export function createTenant(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<TenantsCreateTenantResponse> {
    return request<TenantsCreateTenantResponse>(
        auth,
        'POST',
        development ? SERVERS.development : SERVERS.production,
        '/tenants',
        options,
    );
}
