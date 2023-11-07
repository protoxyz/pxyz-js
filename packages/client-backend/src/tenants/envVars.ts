import { request, RequestOptions, AuthOptions } from "../request";
import { SERVERS } from "../servers";

export type TenantsEnvVarsResponse = {
    PXYZ_PUBLIC_KEY: string  
    PXYZ_SECRET_KEY: string  
    PXYZ_DOMAIN: string  
}

export type TenantsEnvVarsInput = undefined;

export function envVars(
    auth: AuthOptions,
    body?: TenantsEnvVarsInput,
    options?: RequestOptions<TenantsEnvVarsInput>,
    development?: boolean,
): Promise<TenantsEnvVarsResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
    return request<TenantsEnvVarsInput, TenantsEnvVarsResponse>(
        auth,
        'GET',
        isDevelopment ? SERVERS.development : SERVERS.production,
        '/auth/tenants/${pathParams.id}/env',
        {...options, body},
    );
}
