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
    brand: Record<any, any>  
    environment: string  
    createdAt: string  
    updatedAt: string  
}

export type TenantsUpdateTenantInput = {
    name: string | null 
    slug: string | null 
    iconId: string | null 
    logoId: string | null 
};

export function updateTenant(
    auth: AuthOptions,
    body?: TenantsUpdateTenantInput,
    options?: RequestOptions<TenantsUpdateTenantInput>,
    development?: boolean,
): Promise<TenantsUpdateTenantResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
    return request<TenantsUpdateTenantInput, TenantsUpdateTenantResponse>(
        auth,
        'PUT',
        isDevelopment ? SERVERS.development : SERVERS.production,
        '/tenants/${pathParams.id}',
        {...options, body},
    );
}
