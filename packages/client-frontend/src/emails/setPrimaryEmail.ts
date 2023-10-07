import { request, RequestOptions, AuthOptions } from '../request';
import { SERVERS } from '../servers';

export type EmailsSetPrimaryEmailResponse = {
  status: string;
  error: string;
  data: {
    emailAddress: {
      id: string;
      userId: string;
      email: string;
      verifiedAt: string;
      createdAt: string;
      updatedAt: string;
    };
  };
};

export function setPrimaryEmail(
  auth: AuthOptions,
  options?: RequestOptions,
  development?: boolean,
): Promise<EmailsSetPrimaryEmailResponse> {
  return request<EmailsSetPrimaryEmailResponse>(
    auth,
    'POST',
    development ? SERVERS.development : SERVERS.production,
    '/user/emails/${pathParams.emailId}/primary',
    options,
  );
}
