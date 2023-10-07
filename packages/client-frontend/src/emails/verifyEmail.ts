import { request, RequestOptions, AuthOptions } from '../request';
import { SERVERS } from '../servers';

export type EmailsVerifyEmailResponse = {
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

export function verifyEmail(
  auth: AuthOptions,
  options?: RequestOptions,
  development?: boolean,
): Promise<EmailsVerifyEmailResponse> {
  return request<EmailsVerifyEmailResponse>(
    auth,
    'POST',
    development ? SERVERS.development : SERVERS.production,
    '/user/emails/${pathParams.emailId}/verify',
    options,
  );
}
