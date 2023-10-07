import { request, RequestOptions, AuthOptions } from '../../request';
import { SERVERS } from '../../servers';

export type AuthOrganizationsUpdateOrganizationResponse = {
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

export function updateOrganization(
  auth: AuthOptions,
  options?: RequestOptions,
  development?: boolean,
): Promise<AuthOrganizationsUpdateOrganizationResponse> {
  return request<AuthOrganizationsUpdateOrganizationResponse>(
    auth,
    'PUT',
    development ? SERVERS.development : SERVERS.production,
    '/auth/organizations/${pathParams.id}',
    options,
  );
}
