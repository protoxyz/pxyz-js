import { request, RequestOptions, AuthOptions } from "../request";
import { SERVERS } from "../servers";

export type TenantsGetTenantResponse = {
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

export type TenantsGetTenantInput = undefined;

export function getTenant(
    auth: AuthOptions,
    body?: TenantsGetTenantInput,
    options?: RequestOptions<TenantsGetTenantInput>,
    development?: boolean,
): Promise<TenantsGetTenantResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
    return request<TenantsGetTenantInput, TenantsGetTenantResponse>(
        auth,
        'GET',
        isDevelopment ? SERVERS.development : SERVERS.production,
        '/tenants/${pathParams.id}',
        {...options, body},
    );
}
