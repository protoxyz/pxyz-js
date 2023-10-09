import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthInstanceSocialProvidersCreateInstanceSocialProviderResponse = {
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

export function createInstanceSocialProvider(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<AuthInstanceSocialProvidersCreateInstanceSocialProviderResponse> {
    return request<AuthInstanceSocialProvidersCreateInstanceSocialProviderResponse>(
        auth,
        'POST',
        development ? SERVERS.development : SERVERS.production,
        '/auth/tenant-social-providers',
        options,
    );
}
