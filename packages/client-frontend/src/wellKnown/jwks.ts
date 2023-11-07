import { request, RequestOptions, AuthOptions } from "../request";
import { SERVERS } from "../servers";

export type WellKnownJwksResponse = {
    status: string  
    error: string | null 
    data: {
    jwks: Record<any, any>  
} | null 
}

export type WellKnownJwksInput = undefined;

export function jwks(
    auth: AuthOptions,
    body?: WellKnownJwksInput,
    options?: RequestOptions<WellKnownJwksInput>,
    development?: boolean,
): Promise<WellKnownJwksResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
    return request<WellKnownJwksInput, WellKnownJwksResponse>(
        auth,
        'GET',
        isDevelopment ? SERVERS.development : SERVERS.production,
        '/.well-known/jwks/${pathParams.domain}',
        {...options, body},
    );
}
