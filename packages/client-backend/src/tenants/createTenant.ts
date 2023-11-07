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
    brand: Record<any, any>  
    environment: string  
    createdAt: string  
    updatedAt: string  
}

export type TenantsCreateTenantInput = {
    orgId: string | null 
    name: string  
    slug: string  
    environment: string  
    domain: string  
};

export function createTenant(
    auth: AuthOptions,
    body?: TenantsCreateTenantInput,
    options?: RequestOptions<TenantsCreateTenantInput>,
    development?: boolean,
): Promise<TenantsCreateTenantResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
    return request<TenantsCreateTenantInput, TenantsCreateTenantResponse>(
        auth,
        'POST',
        isDevelopment ? SERVERS.development : SERVERS.production,
        '/tenants',
        {...options, body},
    );
}
