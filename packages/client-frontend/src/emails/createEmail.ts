import { request, RequestOptions, AuthOptions } from '../request';
import { SERVERS } from '../servers';

export type EmailsCreateEmailResponse = {
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

export function createEmail(
  auth: AuthOptions,
  options?: RequestOptions,
  development?: boolean,
): Promise<EmailsCreateEmailResponse> {
  return request<EmailsCreateEmailResponse>(
    auth,
    'POST',
    development ? SERVERS.development : SERVERS.production,
    '/user/emails',
    options,
  );
}
