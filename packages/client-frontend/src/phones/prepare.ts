import { request, RequestOptions, AuthOptions } from '../request';
import { SERVERS } from '../servers';

export type PhonesPrepareResponse = {
  status: string;
  error: string;
};

export function prepare(
  auth: AuthOptions,
  options?: RequestOptions,
  development?: boolean,
): Promise<PhonesPrepareResponse> {
  return request<PhonesPrepareResponse>(
    auth,
    'POST',
    development ? SERVERS.development : SERVERS.production,
    '/user/phones/${pathParams.phoneId}/resend',
    options,
  );
}
