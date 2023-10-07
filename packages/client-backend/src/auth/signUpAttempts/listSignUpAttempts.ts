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

export function listSignUpAttempts(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<AuthSignUpAttemptsListSignUpAttemptsResponse> {
    return request<AuthSignUpAttemptsListSignUpAttemptsResponse>(
        auth,
        'GET',
        development ? SERVERS.development : SERVERS.production,
        '/auth/sign-ups',
        options,
    );
}

