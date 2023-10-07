import { request, RequestOptions, AuthOptions } from '../request';
import { SERVERS } from '../servers';

export type PhonesVerifyPhoneResponse = {
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

export function verifyPhone(
  auth: AuthOptions,
  options?: RequestOptions,
  development?: boolean,
): Promise<PhonesVerifyPhoneResponse> {
  return request<PhonesVerifyPhoneResponse>(
    auth,
    'POST',
    development ? SERVERS.development : SERVERS.production,
    '/user/phones/${pathParams.phoneId}/verify',
    options,
  );
}
