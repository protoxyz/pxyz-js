import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthSocialProvidersUpdateSocialProviderResponse = {
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
export type AuthSocialProvidersUpdateSocialProviderInput = {
    enabled: boolean  
    useCustomCredentials: boolean  
    clientId: string | null 
    clientSecret: string | null 
    redirectUri: string | null 
    additionalScopes: any | null 
    authenticatable: boolean  
    autoConnectAccounts: boolean  
    config: Record<any, any>  
};
export function updateSocialProvider(
    auth: AuthOptions,
    body?: AuthSocialProvidersUpdateSocialProviderInput,
    options?: RequestOptions<AuthSocialProvidersUpdateSocialProviderInput>,
    development?: boolean,
): Promise<AuthSocialProvidersUpdateSocialProviderResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<AuthSocialProvidersUpdateSocialProviderInput, AuthSocialProvidersUpdateSocialProviderResponse>(
      auth,
      'PUT',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/auth/social-providers/${pathParams.id}',
      options,
  );
}

