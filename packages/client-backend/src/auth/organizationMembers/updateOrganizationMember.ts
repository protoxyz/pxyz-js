import { request, RequestOptions, AuthOptions } from '../../request';
import { SERVERS } from '../../servers';

export type AuthOrganizationMembersUpdateOrganizationMemberResponse = {
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
};

export function updateOrganizationMember(
  auth: AuthOptions,
  options?: RequestOptions,
  development?: boolean,
): Promise<AuthOrganizationMembersUpdateOrganizationMemberResponse> {
  return request<AuthOrganizationMembersUpdateOrganizationMemberResponse>(
    auth,
    'PUT',
    development ? SERVERS.development : SERVERS.production,
    '/auth/organization-members/${pathParams.id}',
    options,
  );
}
