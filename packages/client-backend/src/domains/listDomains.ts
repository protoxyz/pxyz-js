import { request, RequestOptions, AuthOptions } from "../request";
import { SERVERS } from "../servers";

export type DomainsListDomainsResponse = {
    id: string  
    tenantId: string  
    name: string  
    primary: boolean 
    type: string  
    verified: boolean 
    verificationRecordType: string  | null
    verificationRecordDomain: string  | null
    verificationRecordValue: string  | null
    verificationRecordReason: string  | null
    createdAt: string  
    updatedAt: string  
}[]

export function listDomains(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<DomainsListDomainsResponse> {
    return request<DomainsListDomainsResponse>(
        auth,
        'GET',
        development ? SERVERS.development : SERVERS.production,
        '/domains',
        options,
    );
}
