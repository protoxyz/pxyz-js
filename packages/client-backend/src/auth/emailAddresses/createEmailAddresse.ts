import { request, RequestOptions, AuthOptions } from '../../request';
import { SERVERS } from '../../servers';

export type AuthEmailAddressesCreateEmailAddresseResponse = {
  id: string;
  tenantId: string;
  userId: string;
  email: string;
  verifiedAt: string;
  createdAt: string;
  updatedAt: string;
};

export function createEmailAddresse(
  auth: AuthOptions,
  options?: RequestOptions,
  development?: boolean,
): Promise<AuthEmailAddressesCreateEmailAddresseResponse> {
  return request<AuthEmailAddressesCreateEmailAddresseResponse>(
    auth,
    'POST',
    development ? SERVERS.development : SERVERS.production,
    '/auth/email-addresses',
    options,
  );
}
