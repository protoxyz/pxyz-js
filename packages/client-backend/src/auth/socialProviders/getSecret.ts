import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthSocialProvidersGetSecretResponse = {
    secret: string  
}
export type AuthSocialProvidersGetSecretInput = undefined;
export function getSecret(
    auth: AuthOptions,
    body?: AuthSocialProvidersGetSecretInput,
    options?: RequestOptions<AuthSocialProvidersGetSecretInput>,
    development?: boolean,
): Promise<AuthSocialProvidersGetSecretResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<AuthSocialProvidersGetSecretInput, AuthSocialProvidersGetSecretResponse>(
      auth,
      'GET',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/auth/social-providers/${pathParams.id}/secret',
      options,
  );
}

