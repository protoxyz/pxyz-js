import { request, RequestOptions, AuthOptions } from '../request';
import { SERVERS } from '../servers';

export type EmailsDeleteEmailResponse = {
  status: string;
  error: string;
};

export function deleteEmail(
  auth: AuthOptions,
  options?: RequestOptions,
  development?: boolean,
): Promise<EmailsDeleteEmailResponse> {
  return request<EmailsDeleteEmailResponse>(
    auth,
    'DELETE',
    development ? SERVERS.development : SERVERS.production,
    '/user/emails/${pathParams.emailId}',
    options,
  );
}
