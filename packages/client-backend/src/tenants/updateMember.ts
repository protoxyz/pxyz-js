import { request, RequestOptions, AuthOptions } from '../request';
import { SERVERS } from '../servers';

export type TenantsUpdateMemberResponse = {
  id: string;
  tenantId: string;
  userId: string;
  user: {
    id: string;
    emailAddresses: {
      id: string;
      email: string;
      verifiedAt: string;
    }[];
    primaryEmailId: string;
    name: string;
  };
  roleAdmin: boolean;
  roleEditOrganizations: boolean;
  roleEditUsers: boolean;
  roleEditConfig: boolean;
  roleViewUsers: boolean;
  roleViewOrganizations: boolean;
  roleViewConfig: boolean;
  roleViewBilling: boolean;
  roleEditBilling: boolean;
  createdAt: string;
  updatedAt: string;
};

export function updateMember(
  auth: AuthOptions,
  options?: RequestOptions,
  development?: boolean,
): Promise<TenantsUpdateMemberResponse> {
  return request<TenantsUpdateMemberResponse>(
    auth,
    'PATCH',
    development ? SERVERS.development : SERVERS.production,
    '/tenants/members/${pathParams.id}',
    options,
  );
}
