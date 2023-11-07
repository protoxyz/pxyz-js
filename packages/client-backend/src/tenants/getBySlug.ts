import { request, RequestOptions, AuthOptions } from "../request";
import { SERVERS } from "../servers";

export type TenantsGetBySlugResponse = {
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

export type TenantsGetBySlugInput = undefined;

export function getBySlug(
    auth: AuthOptions,
    body?: TenantsGetBySlugInput,
    options?: RequestOptions<TenantsGetBySlugInput>,
    development?: boolean,
): Promise<TenantsGetBySlugResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
    return request<TenantsGetBySlugInput, TenantsGetBySlugResponse>(
        auth,
        'GET',
        isDevelopment ? SERVERS.development : SERVERS.production,
        '/tenants/slug/${pathParams.slug}',
        {...options, body},
    );
}
