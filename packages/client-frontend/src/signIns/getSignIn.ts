import { request, RequestOptions, AuthOptions } from "../request";
import { SERVERS } from "../servers";

export type SignInsGetSignInResponse = {
    status: string  
    error: string | null 
    data: {
    signInAttempt: {
    id: string  
    userId: string | null 
    tenantId: string  
    identifier: string | null 
    status: string  
    strategy: string | null 
    oauthProviderId: string | null 
    oauthProvider: {
    id: string  
    providerKey: string  
} | null 
    ipAddress: string | null 
    userAgent: string | null 
    redirectUri: string | null 
    createdAt: string  
    updatedAt: string  
} | null 
}  
}

export function getSignIn(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<SignInsGetSignInResponse> {
    return request<SignInsGetSignInResponse>(
        auth,
        'GET',
        development ? SERVERS.development : SERVERS.production,
        '/sign-ins/${pathParams.id}',
        options,
    );
}
