import { request, RequestOptions, AuthOptions } from "../request";
import { SERVERS } from "../servers";

export type TenantsEnvVarsResponse = {
    PXYZ_PUBLIC_KEY: string
    PXYZ_SECRET_KEY: string
    PXYZ_DOMAIN: string
}

export function envVars(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<TenantsEnvVarsResponse> {
    return request<TenantsEnvVarsResponse>(
        auth,
        'GET',
        development ? SERVERS.development : SERVERS.production,
        '/auth/tenants/${pathParams.id}/env',
        options,
    );
}
