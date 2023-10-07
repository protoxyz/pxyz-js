import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthJwkCertificatesListJwkCertificatesResponse = {
    id: string  
    tenantId: string  
    public: string  
    createdAt: string  
    updatedAt: string  
}[]

export function listJwkCertificates(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<AuthJwkCertificatesListJwkCertificatesResponse> {
    return request<AuthJwkCertificatesListJwkCertificatesResponse>(
        auth,
        'GET',
        development ? SERVERS.development : SERVERS.production,
        '/auth/jwk-certificates',
        options,
    );
}

