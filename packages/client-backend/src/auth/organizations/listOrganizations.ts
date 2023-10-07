import { request, RequestOptions, AuthOptions } from '../../request';
import { SERVERS } from '../../servers';

export type AuthOrganizationsListOrganizationsResponse = {
  status: string;
  data: {
    id: string;
    creatorId: string;
    tenantId: string;
    slug: string;
    name: string;
    imageUri: string;
    privateMeta: undefined;
    publicMeta: undefined;
    _count: {
      members: number;
    };
    createdAt: string;
    updatedAt: string;
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
): Promise<AuthOrganizationsListOrganizationsResponse> {
  return request<AuthOrganizationsListOrganizationsResponse>(
    auth,
    'GET',
    development ? SERVERS.development : SERVERS.production,
    '/tenants/${pathParams.tenantId}/auth/organizations',
    options,
  );
}
