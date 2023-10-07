import { request, RequestOptions, AuthOptions } from '../request';
import { SERVERS } from '../servers';

export type OrganizationMembersUpdateOrganizationMemberResponse = {
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

export function updateOrganizationMember(
  auth: AuthOptions,
  options?: RequestOptions,
  development?: boolean,
): Promise<OrganizationMembersUpdateOrganizationMemberResponse> {
  return request<OrganizationMembersUpdateOrganizationMemberResponse>(
    auth,
    'PATCH',
    development ? SERVERS.development : SERVERS.production,
    '/user/organizations/${pathParams.orgId}/members/${pathParams.memberId}',
    options,
  );
}
