import { request, RequestOptions, AuthOptions } from '../request';
import { SERVERS } from '../servers';

export type TenantsUpdateInvitationResponse = {
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
};

export function updateInvitation(
  auth: AuthOptions,
  options?: RequestOptions,
  development?: boolean,
): Promise<TenantsUpdateInvitationResponse> {
  return request<TenantsUpdateInvitationResponse>(
    auth,
    'PATCH',
    development ? SERVERS.development : SERVERS.production,
    '/tenants/invitations/${pathParams.id}',
    options,
  );
}
