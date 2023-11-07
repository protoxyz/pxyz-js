import { request, RequestOptions, AuthOptions } from "../request";
import { SERVERS } from "../servers";

export type DomainsGetDomainResponse = {
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

export type DomainsGetDomainInput = undefined;

export function getDomain(
    auth: AuthOptions,
    body?: DomainsGetDomainInput,
    options?: RequestOptions<DomainsGetDomainInput>,
    development?: boolean,
): Promise<DomainsGetDomainResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
    return request<DomainsGetDomainInput, DomainsGetDomainResponse>(
        auth,
        'GET',
        isDevelopment ? SERVERS.development : SERVERS.production,
        '/domains/${pathParams.id}',
        {...options, body},
    );
}
