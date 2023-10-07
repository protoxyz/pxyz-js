import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthInstanceSocialProvidersGetInstanceSocialProviderResponse = {
    id: string  
    tenantId: string  
    providerKey: string  
    enabled: boolean  
    useCustomCredentials: boolean | null 
    clientId: string | null 
    redirectUri: string | null 
    additionalScopes: Record<any, any>  
    createdAt: string  
    updatedAt: string  
}

export function getInstanceSocialProvider(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<AuthInstanceSocialProvidersGetInstanceSocialProviderResponse> {
    return request<AuthInstanceSocialProvidersGetInstanceSocialProviderResponse>(
        auth,
        'GET',
        development ? SERVERS.development : SERVERS.production,
        '/auth/tenant-social-providers/${pathParams.id}',
        options,
    );
}

