import { request, RequestOptions, AuthOptions } from '../request';
import { SERVERS } from '../servers';

export type OrganizationsUpdateOrganizationResponse = {
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

export function updateOrganization(
  auth: AuthOptions,
  options?: RequestOptions,
  development?: boolean,
): Promise<OrganizationsUpdateOrganizationResponse> {
  return request<OrganizationsUpdateOrganizationResponse>(
    auth,
    'PUT',
    development ? SERVERS.development : SERVERS.production,
    '/user/organizations/${pathParams.organizationId}',
    options,
  );
}
