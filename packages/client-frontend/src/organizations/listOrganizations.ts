import { request, RequestOptions, AuthOptions } from '../request';
import { SERVERS } from '../servers';

export type OrganizationsListOrganizationsResponse = {
  status: string;
  error: string;
  data: {
    id: string;
    name: string;
    slug: string;
    description: string;
    logoUri: string;
    iconUri: string;
    createdAt: undefined;
    updatedAt: undefined;
    membership: {
      id: string;
      roleId: string;
      role: {
        name: string;
        description: string;
        permissions: string[];
      };
    };
  }[];
  meta: {
    total: number;
    count: number;
    numPages: number;
    perPage: number;
    prev: string;
    next: string;
  };
};

export function listOrganizations(
  auth: AuthOptions,
  options?: RequestOptions,
  development?: boolean,
): Promise<OrganizationsListOrganizationsResponse> {
  return request<OrganizationsListOrganizationsResponse>(
    auth,
    'GET',
    development ? SERVERS.development : SERVERS.production,
    '/user/organizations',
    options,
  );
}
