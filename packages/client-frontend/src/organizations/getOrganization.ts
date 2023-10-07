import { request, RequestOptions, AuthOptions } from '../request';
import { SERVERS } from '../servers';

export type OrganizationsGetOrganizationResponse = {
  status: string;
  error: string;
  data: {
    organization: {
      id: string;
      name: string;
      slug: string;
      description: string;
      logoUri: string;
      iconUri: string;
      createdAt: undefined;
      updatedAt: undefined;
    };
  };
};

export function getOrganization(
  auth: AuthOptions,
  options?: RequestOptions,
  development?: boolean,
): Promise<OrganizationsGetOrganizationResponse> {
  return request<OrganizationsGetOrganizationResponse>(
    auth,
    'GET',
    development ? SERVERS.development : SERVERS.production,
    '/user/organizations/${pathParams.organizationId}',
    options,
  );
}
