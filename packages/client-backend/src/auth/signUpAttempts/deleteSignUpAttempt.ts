import { request, RequestOptions, AuthOptions } from '../../request';
import { SERVERS } from '../../servers';

export type AuthSignUpAttemptsDeleteSignUpAttemptResponse = {
  deleted: boolean;
};

export function deleteSignUpAttempt(
  auth: AuthOptions,
  options?: RequestOptions,
  development?: boolean,
): Promise<AuthSignUpAttemptsDeleteSignUpAttemptResponse> {
  return request<AuthSignUpAttemptsDeleteSignUpAttemptResponse>(
    auth,
    'DELETE',
    development ? SERVERS.development : SERVERS.production,
    '/auth/sign-ups/${pathParams.id}',
    options,
  );
}
