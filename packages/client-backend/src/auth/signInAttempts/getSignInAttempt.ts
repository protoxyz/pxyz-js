import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthSignInAttemptsGetSignInAttemptResponse = {
    id: string  
    tenantId: string  
    userId: string | null 
    ipAddress: string | null 
    userAgent: string | null 
    identifier: string | null 
    status: string | null 
    strategy: string | null 
    oauthProviderId: string | null 
    oauthProvider: {
    id: string  
    tenantId: string  
    providerKey: string  
    enabled: boolean  
    useCustomCredentials: boolean | null 
    clientId: string | null 
    redirectUri: string | null 
    additionalScopes: Record<any, any>  
    authenticatable: boolean | null 
    autoConnectAccounts: boolean | null 
    config: Record<any, any>  
    createdAt: string  
    updatedAt: string  
} | null 
    user: Record<any, any>  
    createdAt: string  
    updatedAt: string  
}
export type AuthSignInAttemptsGetSignInAttemptInput = undefined;
export function getSignInAttempt(
    auth: AuthOptions,
    body?: AuthSignInAttemptsGetSignInAttemptInput,
    options?: RequestOptions<AuthSignInAttemptsGetSignInAttemptInput>,
    development?: boolean,
): Promise<AuthSignInAttemptsGetSignInAttemptResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<AuthSignInAttemptsGetSignInAttemptInput, AuthSignInAttemptsGetSignInAttemptResponse>(
      auth,
      'GET',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/auth/sign-ins/${pathParams.id}',
      options,
  );
}

