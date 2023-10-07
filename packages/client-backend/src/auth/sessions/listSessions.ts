import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthSessionsListSessionsResponse = {
    status: string  
    data: {
    id: string  
    browser: string | null 
    device: string | null 
    engine: string | null 
    os: string | null 
    cpu: string | null 
    ua: string | null 
    ip: string | null 
    tenantId: string  
    userId: string  
    user: Record<any, any>  
    signInAttemptId: string | null 
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
    createdAt: string  
    updatedAt: string  
} | null 
    user: Record<any, any>  
    createdAt: string  
    updatedAt: string  
} | null 
    signUpAttemptId: string | null 
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
    meta: {
    total: number  
    count: number  
    numPages: number  
    perPage: number  
    prev: string | null 
    next: string | null 
}  
}

export function listSessions(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<AuthSessionsListSessionsResponse> {
    return request<AuthSessionsListSessionsResponse>(
        auth,
        'GET',
        development ? SERVERS.development : SERVERS.production,
        '/tenants/${pathParams.tenantId}/auth/sessions',
        options,
    );
}

