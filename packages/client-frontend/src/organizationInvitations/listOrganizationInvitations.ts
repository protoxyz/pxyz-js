import { request, RequestOptions, AuthOptions } from '../request';
import { SERVERS } from '../servers';

export type OrganizationInvitationsListOrganizationInvitationsResponse = {
  status: string;
  error: string;
  data: {
    id: string;
    organizationId: string;
    email: string;
    phone: string;
    userId: string;
    roleId: string;
    acceptedAt: string;
    declinedAt: string;
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

export function listOrganizationInvitations(
  auth: AuthOptions,
  options?: RequestOptions,
  development?: boolean,
): Promise<OrganizationInvitationsListOrganizationInvitationsResponse> {
  return request<OrganizationInvitationsListOrganizationInvitationsResponse>(
    auth,
    'GET',
    development ? SERVERS.development : SERVERS.production,
    '/organizations/${pathParams.organizationId}/invitations',
    options,
  );
}
