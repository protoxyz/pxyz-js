import { request, RequestOptions, AuthOptions } from '../../request';
import { SERVERS } from '../../servers';

export type AuthInstanceSocialProvidersListInstanceSocialProvidersResponse = {
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
}[];

export function listInstanceSocialProviders(
  auth: AuthOptions,
  options?: RequestOptions,
  development?: boolean,
): Promise<AuthInstanceSocialProvidersListInstanceSocialProvidersResponse> {
  return request<AuthInstanceSocialProvidersListInstanceSocialProvidersResponse>(
    auth,
    'GET',
    development ? SERVERS.development : SERVERS.production,
    '/auth/tenant-social-providers',
    options,
  );
}
