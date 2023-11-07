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
    brand: unknown 
    environment: string  
    createdAt: string  
    updatedAt: string  
}[]

export type TenantsListTenantsInput = undefined;

export function listTenants(
    auth: AuthOptions,
    body?: TenantsListTenantsInput,
    options?: RequestOptions<TenantsListTenantsInput>,
    development?: boolean,
): Promise<TenantsListTenantsResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
    return request<TenantsListTenantsInput, TenantsListTenantsResponse>(
        auth,
        'GET',
        isDevelopment ? SERVERS.development : SERVERS.production,
        '/tenants',
        {...options, body},
    );
}
