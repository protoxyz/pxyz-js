import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthSocialProvidersDeleteSocialProviderResponse = {
    deleted: boolean  
}
export type AuthSocialProvidersDeleteSocialProviderInput = undefined;
export function deleteSocialProvider(
    auth: AuthOptions,
    body?: AuthSocialProvidersDeleteSocialProviderInput,
    options?: RequestOptions<AuthSocialProvidersDeleteSocialProviderInput>,
    development?: boolean,
): Promise<AuthSocialProvidersDeleteSocialProviderResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<AuthSocialProvidersDeleteSocialProviderInput, AuthSocialProvidersDeleteSocialProviderResponse>(
      auth,
      'DELETE',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/auth/social-providers/${pathParams.id}',
      options,
  );
}

