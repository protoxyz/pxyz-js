import { request, RequestOptions, AuthOptions } from '../../request';
import { SERVERS } from '../../servers';

export type AuthEmailAddressesListEmailAddressesResponse = {
  status: string;
  data: {
    id: string;
    tenantId: string;
    userId: string;
    email: string;
    verifiedAt: string;
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

export function listEmailAddresses(
  auth: AuthOptions,
  options?: RequestOptions,
  development?: boolean,
): Promise<AuthEmailAddressesListEmailAddressesResponse> {
  return request<AuthEmailAddressesListEmailAddressesResponse>(
    auth,
    'GET',
    development ? SERVERS.development : SERVERS.production,
    '/tenants/${pathParams.tenantId}/auth/email-addresses',
    options,
  );
}
