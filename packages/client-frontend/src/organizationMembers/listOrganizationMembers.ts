import { request, RequestOptions, AuthOptions } from '../request';
import { SERVERS } from '../servers';

export type OrganizationMembersListOrganizationMembersResponse = {
  status: string;
  error: string;
  data: {
    id: string;
    organizationId: string;
    userId: string;
    roleId: string;
    role: {
      id: string;
      name: string;
      description: string;
      permissions: string[];
    };
    user: {
      id: string;
      name: string;
      identifier: string;
      imageUri: string;
      createdAt: string;
      updatedAt: string;
    };
    publicMeta: undefined;
    privateMeta: undefined;
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

export function listOrganizationMembers(
  auth: AuthOptions,
  options?: RequestOptions,
  development?: boolean,
): Promise<OrganizationMembersListOrganizationMembersResponse> {
  return request<OrganizationMembersListOrganizationMembersResponse>(
    auth,
    'GET',
    development ? SERVERS.development : SERVERS.production,
    '/user/organizations/${pathParams.orgId}/members',
    options,
  );
}
