import { request, RequestOptions, AuthOptions } from "../request";
import { SERVERS } from "../servers";

export type DomainsCreateDomainResponse = {
    id: string  
    tenantId: string  
    name: string  
    primary: boolean  
    type: string  
    verified: boolean  
    verificationRecordType: string | null 
    verificationRecordDomain: string | null 
    verificationRecordValue: string | null 
    verificationRecordReason: string | null 
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
