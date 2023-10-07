import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthSignInAttemptsListSignInAttemptsResponse = {
    status: string
    data: {
    id: string
    tenantId: string
    userId: string
    ipAddress: string
    userAgent: string
    identifier: string
    status: string
    strategy: string
    oauthProviderId: string
    oauthProvider: {
    id: string
    tenantId: string
    providerKey: string
    enabled: boolean
    useCustomCredentials: boolean
    clientId: string
    redirectUri: string
    additionalScopes: undefined
    createdAt: string
    updatedAt: string
}
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

export function listSignInAttempts(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<AuthSignInAttemptsListSignInAttemptsResponse> {
    return request<AuthSignInAttemptsListSignInAttemptsResponse>(
        auth,
        'GET',
        development ? SERVERS.development : SERVERS.production,
        '/auth/sign-ins',
        options,
    );
}

