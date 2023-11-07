import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthSignUpAttemptsGetSignUpAttemptResponse = {
    id: string  
    tenantId: string  
    userId: string | null 
    user: Record<any, any>  
    createdAt: string  
    updatedAt: string  
}
export type AuthSignUpAttemptsGetSignUpAttemptInput = undefined;
export function getSignUpAttempt(
    auth: AuthOptions,
    body?: AuthSignUpAttemptsGetSignUpAttemptInput,
    options?: RequestOptions<AuthSignUpAttemptsGetSignUpAttemptInput>,
    development?: boolean,
): Promise<AuthSignUpAttemptsGetSignUpAttemptResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<AuthSignUpAttemptsGetSignUpAttemptInput, AuthSignUpAttemptsGetSignUpAttemptResponse>(
      auth,
      'GET',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/auth/sign-ups/${pathParams.id}',
      options,
  );
}

