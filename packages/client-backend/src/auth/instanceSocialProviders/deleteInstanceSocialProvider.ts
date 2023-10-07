import { request, RequestOptions, AuthOptions } from '../../request';
import { SERVERS } from '../../servers';

export type AuthInstanceSocialProvidersDeleteInstanceSocialProviderResponse = {
  deleted: boolean;
};

export function deleteInstanceSocialProvider(
  auth: AuthOptions,
  options?: RequestOptions,
  development?: boolean,
): Promise<AuthInstanceSocialProvidersDeleteInstanceSocialProviderResponse> {
  return request<AuthInstanceSocialProvidersDeleteInstanceSocialProviderResponse>(
    auth,
    'DELETE',
    development ? SERVERS.development : SERVERS.production,
    '/auth/tenant-social-providers/${pathParams.id}',
    options,
  );
}
