import { request, RequestOptions, AuthOptions } from '../../request';
import { SERVERS } from '../../servers';

export type AuthOrganizationMembersListOrganizationMembersResponse = {
  status: string;
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
      tenantId: string;
      _count: {
        users: number;
        members: number;
      };
      createdAt: string;
      updatedAt: string;
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
): Promise<AuthOrganizationMembersListOrganizationMembersResponse> {
  return request<AuthOrganizationMembersListOrganizationMembersResponse>(
    auth,
    'GET',
    development ? SERVERS.development : SERVERS.production,
    '/organizations/${pathParams.organizationId}/auth/organization-members',
    options,
  );
}
