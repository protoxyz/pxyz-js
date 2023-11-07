import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthSignUpAttemptsListSignUpAttemptsResponse = {
    data: {
    id: string  
    tenantId: string  
    userId: string | null 
    user: Record<any, any>  
    createdAt: string  
    updatedAt: string  
}[]  
    meta: {
    total: number  
    count: number  
    numPages: number  
    perPage: number  
    prev: string | null 
    next: string | null 
}  
}
export type AuthSignUpAttemptsListSignUpAttemptsInput = undefined;
export function listSignUpAttempts(
    auth: AuthOptions,
    body?: AuthSignUpAttemptsListSignUpAttemptsInput,
    options?: RequestOptions<AuthSignUpAttemptsListSignUpAttemptsInput>,
    development?: boolean,
): Promise<AuthSignUpAttemptsListSignUpAttemptsResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<AuthSignUpAttemptsListSignUpAttemptsInput, AuthSignUpAttemptsListSignUpAttemptsResponse>(
      auth,
      'GET',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/auth/sign-ups',
      options,
  );
}

