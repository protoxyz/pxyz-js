import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthSignInAttemptsListSignInAttemptsResponse = {
    status: string  
    data: {
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
export type AuthSignInAttemptsListSignInAttemptsInput = undefined;
export function listSignInAttempts(
    auth: AuthOptions,
    body?: AuthSignInAttemptsListSignInAttemptsInput,
    options?: RequestOptions<AuthSignInAttemptsListSignInAttemptsInput>,
    development?: boolean,
): Promise<AuthSignInAttemptsListSignInAttemptsResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<AuthSignInAttemptsListSignInAttemptsInput, AuthSignInAttemptsListSignInAttemptsResponse>(
      auth,
      'GET',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/auth/sign-ins',
      options,
  );
}

