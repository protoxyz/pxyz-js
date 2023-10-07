import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthInstanceSocialProvidersGetSecretResponse = {
    secret: string  
}

export function getSecret(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<AuthInstanceSocialProvidersGetSecretResponse> {
    return request<AuthInstanceSocialProvidersGetSecretResponse>(
        auth,
        'GET',
        development ? SERVERS.development : SERVERS.production,
        '/auth/tenant-social-providers/${pathParams.id}/secret',
        options,
    );
}

