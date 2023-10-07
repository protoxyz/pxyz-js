import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthSignInAttemptsGetSignInAttemptResponse = {
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

export function getSignInAttempt(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<AuthSignInAttemptsGetSignInAttemptResponse> {
    return request<AuthSignInAttemptsGetSignInAttemptResponse>(
        auth,
        'GET',
        development ? SERVERS.development : SERVERS.production,
        '/auth/sign-ins/${pathParams.id}',
        options,
    );
}

