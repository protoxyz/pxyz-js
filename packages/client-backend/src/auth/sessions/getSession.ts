import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthSessionsGetSessionResponse = {
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
}

export function getSession(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<AuthSessionsGetSessionResponse> {
    return request<AuthSessionsGetSessionResponse>(
        auth,
        'GET',
        development ? SERVERS.development : SERVERS.production,
        '/auth/sessions/${pathParams.id}',
        options,
    );
}

