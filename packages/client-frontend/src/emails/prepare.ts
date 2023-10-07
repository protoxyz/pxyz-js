import { request, RequestOptions, AuthOptions } from '../request';
import { SERVERS } from '../servers';

export type EmailsPrepareResponse = {
  status: string;
  error: string;
};

export function prepare(
  auth: AuthOptions,
  options?: RequestOptions,
  development?: boolean,
): Promise<EmailsPrepareResponse> {
  return request<EmailsPrepareResponse>(
    auth,
    'POST',
    development ? SERVERS.development : SERVERS.production,
    '/user/emails/${pathParams.emailId}/prepare',
    options,
  );
}
