import { request, RequestOptions, AuthOptions } from '../request';
import { SERVERS } from '../servers';

export type EmailsPrepareEmailResponse = {
  status: string;
  error: string;
};

export function prepareEmail(
  auth: AuthOptions,
  options?: RequestOptions,
  development?: boolean,
): Promise<EmailsPrepareEmailResponse> {
  return request<EmailsPrepareEmailResponse>(
    auth,
    'POST',
    development ? SERVERS.development : SERVERS.production,
    '/user/emails/${pathParams.emailId}/prepare',
    options,
  );
}
