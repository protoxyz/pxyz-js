import { request, RequestOptions, AuthOptions } from '../request';
import { SERVERS } from '../servers';

export type TenantsDeleteMemberResponse = boolean;

export function deleteMember(
  auth: AuthOptions,
  options?: RequestOptions,
  development?: boolean,
): Promise<TenantsDeleteMemberResponse> {
  return request<TenantsDeleteMemberResponse>(
    auth,
    'DELETE',
    development ? SERVERS.development : SERVERS.production,
    '/tenants/members/${pathParams.id}',
    options,
  );
}
