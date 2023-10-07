import { request, RequestOptions, AuthOptions } from '../request';
import { SERVERS } from '../servers';

export type OrganizationMembersDeleteOrganizationMemberResponse = {
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
  };
};

export function deleteOrganizationMember(
  auth: AuthOptions,
  options?: RequestOptions,
  development?: boolean,
): Promise<OrganizationMembersDeleteOrganizationMemberResponse> {
  return request<OrganizationMembersDeleteOrganizationMemberResponse>(
    auth,
    'DELETE',
    development ? SERVERS.development : SERVERS.production,
    '/user/organizations/${pathParams.orgId}/members/${pathParams.memberId}',
    options,
  );
}
