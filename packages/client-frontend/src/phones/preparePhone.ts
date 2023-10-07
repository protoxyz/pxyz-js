import { request, RequestOptions, AuthOptions } from '../request';
import { SERVERS } from '../servers';

export type PhonesPreparePhoneResponse = {
  status: string;
  error: string;
};

export function preparePhone(
  auth: AuthOptions,
  options?: RequestOptions,
  development?: boolean,
): Promise<PhonesPreparePhoneResponse> {
  return request<PhonesPreparePhoneResponse>(
    auth,
    'POST',
    development ? SERVERS.development : SERVERS.production,
    '/user/phones/${pathParams.phoneId}/resend',
    options,
  );
}
