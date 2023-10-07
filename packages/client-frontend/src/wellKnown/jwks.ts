import { request, RequestOptions, AuthOptions } from '../request';
import { SERVERS } from '../servers';

export type WellKnownJwksResponse = {
  status: string;
  error: string;
  data: {
    jwks: undefined;
  };
};

export function jwks(
  auth: AuthOptions,
  options?: RequestOptions,
  development?: boolean,
): Promise<WellKnownJwksResponse> {
  return request<WellKnownJwksResponse>(
    auth,
    'GET',
    development ? SERVERS.development : SERVERS.production,
    '/.well-known/jwks/${pathParams.domain}',
    options,
  );
}
