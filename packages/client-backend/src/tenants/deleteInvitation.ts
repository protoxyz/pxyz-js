import { request, RequestOptions, AuthOptions } from '../request';
import { SERVERS } from '../servers';

export type TenantsDeleteInvitationResponse = boolean;

export function deleteInvitation(
  auth: AuthOptions,
  options?: RequestOptions,
  development?: boolean,
): Promise<TenantsDeleteInvitationResponse> {
  return request<TenantsDeleteInvitationResponse>(
    auth,
    'DELETE',
    development ? SERVERS.development : SERVERS.production,
    '/tenants/invitations/${pathParams.id}',
    options,
  );
}
