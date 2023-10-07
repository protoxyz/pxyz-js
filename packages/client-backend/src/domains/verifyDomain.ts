import { request, RequestOptions, AuthOptions } from "../request";
import { SERVERS } from "../servers";

export type DomainsVerifyDomainResponse = {
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

export function verifyDomain(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<DomainsVerifyDomainResponse> {
    return request<DomainsVerifyDomainResponse>(
        auth,
        'POST',
        development ? SERVERS.development : SERVERS.production,
        '/domains/${pathParams.id}/verify',
        options,
    );
}
