import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthSignUpAttemptsListSignUpAttemptsResponse = {
    data: {
    id: string
    tenantId: string
    userId: string
    user: undefined
    createdAt: string
    updatedAt: string
}[]
    meta: {
    total: number
    count: number
    numPages: number
    perPage: number
    prev: string
    next: string
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

