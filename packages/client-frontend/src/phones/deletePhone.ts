import { request, RequestOptions, AuthOptions } from '../request';
import { SERVERS } from '../servers';

export type PhonesDeletePhoneResponse = {
  status: string;
  error: string;
};

export function deletePhone(
  auth: AuthOptions,
  options?: RequestOptions,
  development?: boolean,
): Promise<PhonesDeletePhoneResponse> {
  return request<PhonesDeletePhoneResponse>(
    auth,
    'DELETE',
    development ? SERVERS.development : SERVERS.production,
    '/user/phones/${pathParams.phoneId}',
    options,
  );
}
