import { request, RequestOptions, AuthOptions } from '../request';
import { SERVERS } from '../servers';

export type PhonesSetPrimaryPhoneResponse = {
  status: string;
  error: string;
  data: {
    phoneNumber: {
      id: string;
      userId: string;
      phone: string;
      verifiedAt: string;
      createdAt: string;
      updatedAt: string;
    };
  };
};

export function setPrimaryPhone(
  auth: AuthOptions,
  options?: RequestOptions,
  development?: boolean,
): Promise<PhonesSetPrimaryPhoneResponse> {
  return request<PhonesSetPrimaryPhoneResponse>(
    auth,
    'POST',
    development ? SERVERS.development : SERVERS.production,
    '/user/phones/${pathParams.phoneId}/primary',
    options,
  );
}
