import { request, RequestOptions, AuthOptions } from '../../request';
import { SERVERS } from '../../servers';

export type AuthOrganizationsDeleteOrganizationResponse = {
  id: string;
  creatorId: string;
  tenantId: string;
  slug: string;
  name: string;
  imageUri: string;
  privateMeta: undefined;
  publicMeta: undefined;
  _count: {
    members: number;
  };
  createdAt: string;
  updatedAt: string;
};

export function deleteOrganization(
  auth: AuthOptions,
  options?: RequestOptions,
  development?: boolean,
): Promise<AuthOrganizationsDeleteOrganizationResponse> {
  return request<AuthOrganizationsDeleteOrganizationResponse>(
    auth,
    'DELETE',
    development ? SERVERS.development : SERVERS.production,
    '/auth/organizations/${pathParams.id}',
    options,
  );
}
