import { request, RequestOptions, AuthOptions } from '../request';
import { SERVERS } from '../servers';

export type OrganizationMembersGetOrganizationMemberResponse = {
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

export function getOrganizationMember(
  auth: AuthOptions,
  options?: RequestOptions,
  development?: boolean,
): Promise<OrganizationMembersGetOrganizationMemberResponse> {
  return request<OrganizationMembersGetOrganizationMemberResponse>(
    auth,
    'GET',
    development ? SERVERS.development : SERVERS.production,
    '/user/organizations/${pathParams.organizationId}/members/${pathParams.memberId}',
    options,
  );
}
