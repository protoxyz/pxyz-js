import { request, RequestOptions, AuthOptions } from '../../request';
import { SERVERS } from '../../servers';

export type AuthEmailAddressesUpdateEmailAddresseResponse = {
  id: string;
  tenantId: string;
  userId: string;
  email: string;
  verifiedAt: string;
  createdAt: string;
  updatedAt: string;
};

export function updateEmailAddresse(
  auth: AuthOptions,
  options?: RequestOptions,
  development?: boolean,
): Promise<AuthEmailAddressesUpdateEmailAddresseResponse> {
  return request<AuthEmailAddressesUpdateEmailAddresseResponse>(
    auth,
    'PUT',
    development ? SERVERS.development : SERVERS.production,
    '/auth/email-addresses',
    options,
  );
}
