import { request, RequestOptions, AuthOptions } from '../../request';
import { SERVERS } from '../../servers';

export type AuthInstanceSocialProvidersGetInstanceSocialProviderResponse = {
  id: string;
  tenantId: string;
  providerKey: string;
  enabled: boolean;
  useCustomCredentials: boolean;
  clientId: string;
  redirectUri: string;
  additionalScopes: undefined;
  createdAt: string;
  updatedAt: string;
};

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
