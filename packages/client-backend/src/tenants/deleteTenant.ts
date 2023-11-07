import { request, RequestOptions, AuthOptions } from "../request";
import { SERVERS } from "../servers";

export type TenantsDeleteTenantResponse = boolean

export type TenantsDeleteTenantInput = undefined;

export function deleteTenant(
    auth: AuthOptions,
    body?: TenantsDeleteTenantInput,
    options?: RequestOptions<TenantsDeleteTenantInput>,
    development?: boolean,
): Promise<TenantsDeleteTenantResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
    return request<TenantsDeleteTenantInput, TenantsDeleteTenantResponse>(
        auth,
        'DELETE',
        isDevelopment ? SERVERS.development : SERVERS.production,
        '/tenants/${pathParams.id}',
        {...options, body},
    );
}
