import { request, RequestOptions, AuthOptions } from "../request";
import { SERVERS } from "../servers";

export type DomainsSetPrimaryDomainResponse = {
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

export function setPrimaryDomain(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<DomainsSetPrimaryDomainResponse> {
    return request<DomainsSetPrimaryDomainResponse>(
        auth,
        'POST',
        development ? SERVERS.development : SERVERS.production,
        '/domains/${pathParams.id}/primary',
        options,
    );
}
