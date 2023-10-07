import { request, RequestOptions, AuthOptions } from '../request';
import { SERVERS } from '../servers';

export type OrganizationsDeleteOrganizationResponse = {
  status: string;
  error: string;
  data: undefined;
};

export function deleteOrganization(
  auth: AuthOptions,
  options?: RequestOptions,
  development?: boolean,
): Promise<OrganizationsDeleteOrganizationResponse> {
  return request<OrganizationsDeleteOrganizationResponse>(
    auth,
    'DELETE',
    development ? SERVERS.development : SERVERS.production,
    '/user/organizations/${pathParams.orgId}',
    options,
  );
}
