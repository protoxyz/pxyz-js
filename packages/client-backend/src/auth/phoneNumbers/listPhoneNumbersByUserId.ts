import { request, RequestOptions, AuthOptions } from '../../request';
import { SERVERS } from '../../servers';

export type AuthPhoneNumbersListPhoneNumbersByUserIdResponse = {
  status: string;
  data: {
    id: string;
    tenantId: string;
    userId: string;
    phone: string;
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

export function listPhoneNumbersByUserId(
  auth: AuthOptions,
  options?: RequestOptions,
  development?: boolean,
): Promise<AuthPhoneNumbersListPhoneNumbersByUserIdResponse> {
  return request<AuthPhoneNumbersListPhoneNumbersByUserIdResponse>(
    auth,
    'GET',
    development ? SERVERS.development : SERVERS.production,
    '/auth/users/${pathParams.userId}/phone-numbers',
    options,
  );
}
