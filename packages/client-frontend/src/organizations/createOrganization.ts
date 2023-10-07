import { request, RequestOptions, AuthOptions } from '../request';
import { SERVERS } from '../servers';

export type OrganizationsCreateOrganizationResponse = {
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

export function createOrganization(
  auth: AuthOptions,
  options?: RequestOptions,
  development?: boolean,
): Promise<OrganizationsCreateOrganizationResponse> {
  return request<OrganizationsCreateOrganizationResponse>(
    auth,
    'POST',
    development ? SERVERS.development : SERVERS.production,
    '/user/organizations',
    options,
  );
}
