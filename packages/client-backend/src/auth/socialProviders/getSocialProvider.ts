import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthSocialProvidersGetSocialProviderResponse = {
    id: string  
    tenantId: string  
    providerKey: string  
    enabled: boolean  
    useCustomCredentials: boolean | null 
    clientId: string | null 
    redirectUri: string | null 
    additionalScopes: Record<any, any>  
    authenticatable: boolean | null 
    autoConnectAccounts: boolean | null 
    config: Record<any, any>  
    createdAt: string  
    updatedAt: string  
}
export type AuthSocialProvidersGetSocialProviderInput = undefined;
export function getSocialProvider(
    auth: AuthOptions,
    body?: AuthSocialProvidersGetSocialProviderInput,
    options?: RequestOptions<AuthSocialProvidersGetSocialProviderInput>,
    development?: boolean,
): Promise<AuthSocialProvidersGetSocialProviderResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<AuthSocialProvidersGetSocialProviderInput, AuthSocialProvidersGetSocialProviderResponse>(
      auth,
      'GET',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/auth/social-providers/${pathParams.id}',
      options,
  );
}

