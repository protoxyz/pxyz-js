import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthInstanceSocialProvidersUpdateInstanceSocialProviderResponse = {
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

export function updateInstanceSocialProvider(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<AuthInstanceSocialProvidersUpdateInstanceSocialProviderResponse> {
    return request<AuthInstanceSocialProvidersUpdateInstanceSocialProviderResponse>(
        auth,
        'PUT',
        development ? SERVERS.development : SERVERS.production,
        '/auth/tenant-social-providers/${pathParams.id}',
        options,
    );
}

