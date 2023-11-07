import { request, RequestOptions, AuthOptions } from "../request";
import { SERVERS } from "../servers";

export type DomainsSetPrimaryDomainResponse = {
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

export type DomainsSetPrimaryDomainInput = undefined;

export function setPrimaryDomain(
    auth: AuthOptions,
    body?: DomainsSetPrimaryDomainInput,
    options?: RequestOptions<DomainsSetPrimaryDomainInput>,
    development?: boolean,
): Promise<DomainsSetPrimaryDomainResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
    return request<DomainsSetPrimaryDomainInput, DomainsSetPrimaryDomainResponse>(
        auth,
        'POST',
        isDevelopment ? SERVERS.development : SERVERS.production,
        '/domains/${pathParams.id}/primary',
        {...options, body},
    );
}
