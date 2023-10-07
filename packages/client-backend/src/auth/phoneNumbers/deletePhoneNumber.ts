import { request, RequestOptions, AuthOptions } from '../../request';
import { SERVERS } from '../../servers';

export type AuthPhoneNumbersDeletePhoneNumberResponse = {
  deleted: boolean;
};

export function deletePhoneNumber(
  auth: AuthOptions,
  options?: RequestOptions,
  development?: boolean,
): Promise<AuthPhoneNumbersDeletePhoneNumberResponse> {
  return request<AuthPhoneNumbersDeletePhoneNumberResponse>(
    auth,
    'DELETE',
    development ? SERVERS.development : SERVERS.production,
    '/auth/phone-numbers',
    options,
  );
}
