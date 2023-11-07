import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthSignUpAttemptsDeleteSignUpAttemptResponse = {
    deleted: boolean  
}
export type AuthSignUpAttemptsDeleteSignUpAttemptInput = undefined;
export function deleteSignUpAttempt(
    auth: AuthOptions,
    body?: AuthSignUpAttemptsDeleteSignUpAttemptInput,
    options?: RequestOptions<AuthSignUpAttemptsDeleteSignUpAttemptInput>,
    development?: boolean,
): Promise<AuthSignUpAttemptsDeleteSignUpAttemptResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<AuthSignUpAttemptsDeleteSignUpAttemptInput, AuthSignUpAttemptsDeleteSignUpAttemptResponse>(
      auth,
      'DELETE',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/auth/sign-ups/${pathParams.id}',
      options,
  );
}

