import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthStatsRecentSignInsResponse = {
    id: string  
    browser: string  | null
    device: string  | null
    engine: string  | null
    os: string  | null
    cpu: string  | null
    ua: string  | null
    ip: string  | null
    tenantId: string  
    userId: string  
    user: unknown 
    signInAttemptId: string  | null
    signInAttempt: {
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
} | null
    signUpAttemptId: string  | null
    signUpAttempt: {
    id: string  
    tenantId: string  
    userId: string | null 
    user: Record<any, any>  
    createdAt: string  
    updatedAt: string  
} | null
    expiresAt: string  
    createdAt: string  
    updatedAt: string  
}[]
export type AuthStatsRecentSignInsInput = undefined;
export function recentSignIns(
    auth: AuthOptions,
    body?: AuthStatsRecentSignInsInput,
    options?: RequestOptions<AuthStatsRecentSignInsInput>,
    development?: boolean,
): Promise<AuthStatsRecentSignInsResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<AuthStatsRecentSignInsInput, AuthStatsRecentSignInsResponse>(
      auth,
      'GET',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/auth/stats/recent-sign-ins',
      options,
  );
}

