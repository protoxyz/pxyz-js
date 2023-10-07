import { request, RequestOptions, AuthOptions } from '../../request';
import { SERVERS } from '../../servers';

export type AuthEmailAddressesListEmailAddressesByUserIdResponse = {
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

export function listEmailAddressesByUserId(
  auth: AuthOptions,
  options?: RequestOptions,
  development?: boolean,
): Promise<AuthEmailAddressesListEmailAddressesByUserIdResponse> {
  return request<AuthEmailAddressesListEmailAddressesByUserIdResponse>(
    auth,
    'GET',
    development ? SERVERS.development : SERVERS.production,
    '/auth/users/${pathParams.userId}/email-addresses',
    options,
  );
}
