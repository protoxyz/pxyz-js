import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthSessionsListSessionsByUserIdResponse = {
    status: string
    data: {
    id: string
    browser: string
    device: string
    engine: string
    os: string
    cpu: string
    ua: string
    ip: string
    tenantId: string
    userId: string
    user: undefined
    signInAttemptId: string
    signInAttempt: {
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
}
    signUpAttemptId: string
    signUpAttempt: {
    id: string
    tenantId: string
    userId: string
    user: undefined
    createdAt: string
    updatedAt: string
}
    expiresAt: string
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

export function listSessionsByUserId(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<AuthSessionsListSessionsByUserIdResponse> {
    return request<AuthSessionsListSessionsByUserIdResponse>(
        auth,
        'GET',
        development ? SERVERS.development : SERVERS.production,
        '/auth/users/${pathParams.userId}/sessions',
        options,
    );
}

