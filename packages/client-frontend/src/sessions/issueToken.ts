import { request, RequestOptions, AuthOptions } from '../request';
import { SERVERS } from '../servers';

export type SessionsIssueTokenResponse = {
  status: string;
  error: string;
  data: {
    jwt: string;
    sessionUser: undefined;
  };
};

export function issueToken(
  auth: AuthOptions,
  options?: RequestOptions,
  development?: boolean,
): Promise<SessionsIssueTokenResponse> {
  return request<SessionsIssueTokenResponse>(
    auth,
    'POST',
    development ? SERVERS.development : SERVERS.production,
    '/user/sessions/token',
    options,
  );
}
