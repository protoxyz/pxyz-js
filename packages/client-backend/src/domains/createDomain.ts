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

export type DomainsCreateDomainInput = {
    tenantId: string  
    name: string  
};

export function createDomain(
    auth: AuthOptions,
    body?: DomainsCreateDomainInput,
    options?: RequestOptions<DomainsCreateDomainInput>,
    development?: boolean,
): Promise<DomainsCreateDomainResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
    return request<DomainsCreateDomainInput, DomainsCreateDomainResponse>(
        auth,
        'POST',
        isDevelopment ? SERVERS.development : SERVERS.production,
        '/domains',
        {...options, body},
    );
}
