import { request, RequestOptions, AuthOptions } from "../request";
import { SERVERS } from "../servers";

export type DomainsGetDomainResponse = {
    id: string
    tenantId: string
    name: string
    primary: boolean
    type: string
    verified: boolean
    verificationRecordType: string
    verificationRecordDomain: string
    verificationRecordValue: string
    verificationRecordReason: string
    createdAt: string
    updatedAt: string
}

export function getDomain(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<DomainsGetDomainResponse> {
    return request<DomainsGetDomainResponse>(
        auth,
        'GET',
        development ? SERVERS.development : SERVERS.production,
        '/domains/${pathParams.id}',
        options,
    );
}
