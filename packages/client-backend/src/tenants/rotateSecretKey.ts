import { request, RequestOptions, AuthOptions } from "../request";
import { SERVERS } from "../servers";

export type TenantsRotateSecretKeyResponse = {
    status: string
}

export function rotateSecretKey(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<TenantsRotateSecretKeyResponse> {
    return request<TenantsRotateSecretKeyResponse>(
        auth,
        'POST',
        development ? SERVERS.development : SERVERS.production,
        '/tenants/${pathParams.id}/rotate-secret-key',
        options,
    );
}
