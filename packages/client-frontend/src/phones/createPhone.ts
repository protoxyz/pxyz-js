import { request, RequestOptions, AuthOptions } from '../request';
import { SERVERS } from '../servers';

export type PhonesCreatePhoneResponse = {
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

export function createPhone(
  auth: AuthOptions,
  options?: RequestOptions,
  development?: boolean,
): Promise<PhonesCreatePhoneResponse> {
  return request<PhonesCreatePhoneResponse>(
    auth,
    'POST',
    development ? SERVERS.development : SERVERS.production,
    '/user/phones',
    options,
  );
}
