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

export function getSignUpAttempt(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<AuthSignUpAttemptsGetSignUpAttemptResponse> {
    return request<AuthSignUpAttemptsGetSignUpAttemptResponse>(
        auth,
        'GET',
        development ? SERVERS.development : SERVERS.production,
        '/auth/sign-ups/${pathParams.id}',
        options,
    );
}

