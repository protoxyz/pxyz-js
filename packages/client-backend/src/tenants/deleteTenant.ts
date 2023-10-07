import { request, RequestOptions, AuthOptions } from '../request';
import { SERVERS } from '../servers';

export type TenantsDeleteTenantResponse = boolean;

export function deleteTenant(
  auth: AuthOptions,
  options?: RequestOptions,
  development?: boolean,
): Promise<TenantsDeleteTenantResponse> {
  return request<TenantsDeleteTenantResponse>(
    auth,
    'DELETE',
    development ? SERVERS.development : SERVERS.production,
    '/tenants/${pathParams.id}',
    options,
  );
}
