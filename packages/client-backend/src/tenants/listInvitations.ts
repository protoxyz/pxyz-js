import { request, RequestOptions, AuthOptions } from '../request';
import { SERVERS } from '../servers';

export type TenantsListInvitationsResponse = {
  status: string;
  data: {
    id: string;
    tenantId: string;
    email: string;
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

export function listInvitations(
  auth: AuthOptions,
  options?: RequestOptions,
  development?: boolean,
): Promise<TenantsListInvitationsResponse> {
  return request<TenantsListInvitationsResponse>(
    auth,
    'GET',
    development ? SERVERS.development : SERVERS.production,
    '/tenants/${pathParams.tenantId}/invitations',
    options,
  );
}
