import { request, RequestOptions, AuthOptions } from "../request";
import { SERVERS } from "../servers";

export type DomainsCreateDomainResponse = {
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

export function createDomain(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<DomainsCreateDomainResponse> {
    return request<DomainsCreateDomainResponse>(
        auth,
        'POST',
        development ? SERVERS.development : SERVERS.production,
        '/domains',
        options,
    );
}
