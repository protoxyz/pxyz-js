import { request, RequestOptions, AuthOptions } from "../request";
import { SERVERS } from "../servers";

export type TenantsListTenantsResponse = {
    id: string  
    name: string  
    slug: string  
    publicKey: string  
    logoId: string  | null
    logoUri: string  | null
    iconId: string  | null
    iconUri: string  | null
    environment: string  
    createdAt: string  
    updatedAt: string  
}[]

export function listTenants(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<TenantsListTenantsResponse> {
    return request<TenantsListTenantsResponse>(
        auth,
        'GET',
        development ? SERVERS.development : SERVERS.production,
        '/tenants',
        options,
    );
}
