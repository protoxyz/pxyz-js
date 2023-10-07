import { request, RequestOptions, AuthOptions } from '../request';
import { SERVERS } from '../servers';

export type TenantsGetTenantResponse = {
  id: string;
  name: string;
  slug: string;
  publicKey: string;
  logoId: string;
  logoUri: string;
  iconId: string;
  iconUri: string;
  environment: string;
  createdAt: string;
  updatedAt: string;
};

export function getTenant(
  auth: AuthOptions,
  options?: RequestOptions,
  development?: boolean,
): Promise<TenantsGetTenantResponse> {
  return request<TenantsGetTenantResponse>(
    auth,
    'GET',
    development ? SERVERS.development : SERVERS.production,
    '/tenants/${pathParams.id}',
    options,
  );
}
