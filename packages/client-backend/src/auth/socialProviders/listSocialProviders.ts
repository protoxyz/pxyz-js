import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthSocialProvidersListSocialProvidersResponse = {
    id: string  
    tenantId: string  
    providerKey: string  
    enabled: boolean 
    useCustomCredentials: boolean | null
    clientId: string  | null
    redirectUri: string  | null
    additionalScopes: unknown 
    authenticatable: boolean | null
    autoConnectAccounts: boolean | null
    config: unknown 
    createdAt: string  
    updatedAt: string  
}[]
export type AuthSocialProvidersListSocialProvidersInput = undefined;
export function listSocialProviders(
    auth: AuthOptions,
    body?: AuthSocialProvidersListSocialProvidersInput,
    options?: RequestOptions<AuthSocialProvidersListSocialProvidersInput>,
    development?: boolean,
): Promise<AuthSocialProvidersListSocialProvidersResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<AuthSocialProvidersListSocialProvidersInput, AuthSocialProvidersListSocialProvidersResponse>(
      auth,
      'GET',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/auth/social-providers',
      options,
  );
}

