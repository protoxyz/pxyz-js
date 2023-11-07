import { request, RequestOptions, AuthOptions } from "../request";
import { SERVERS } from "../servers";

export type TenantsRotateSecretKeyResponse = {
    status: string  
}

export type TenantsRotateSecretKeyInput = undefined;

export function rotateSecretKey(
    auth: AuthOptions,
    body?: TenantsRotateSecretKeyInput,
    options?: RequestOptions<TenantsRotateSecretKeyInput>,
    development?: boolean,
): Promise<TenantsRotateSecretKeyResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
    return request<TenantsRotateSecretKeyInput, TenantsRotateSecretKeyResponse>(
        auth,
        'POST',
        isDevelopment ? SERVERS.development : SERVERS.production,
        '/tenants/${pathParams.id}/rotate-secret-key',
        {...options, body},
    );
}
