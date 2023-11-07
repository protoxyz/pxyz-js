import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthSignInAttemptsDeleteSignInAttemptResponse = {
    deleted: boolean  
}
export type AuthSignInAttemptsDeleteSignInAttemptInput = undefined;
export function deleteSignInAttempt(
    auth: AuthOptions,
    body?: AuthSignInAttemptsDeleteSignInAttemptInput,
    options?: RequestOptions<AuthSignInAttemptsDeleteSignInAttemptInput>,
    development?: boolean,
): Promise<AuthSignInAttemptsDeleteSignInAttemptResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<AuthSignInAttemptsDeleteSignInAttemptInput, AuthSignInAttemptsDeleteSignInAttemptResponse>(
      auth,
      'DELETE',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/auth/sign-ins/${pathParams.id}',
      options,
  );
}

