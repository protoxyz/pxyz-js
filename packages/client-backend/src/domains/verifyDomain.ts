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

export type DomainsVerifyDomainInput = undefined;

export function verifyDomain(
    auth: AuthOptions,
    body?: DomainsVerifyDomainInput,
    options?: RequestOptions<DomainsVerifyDomainInput>,
    development?: boolean,
): Promise<DomainsVerifyDomainResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
    return request<DomainsVerifyDomainInput, DomainsVerifyDomainResponse>(
        auth,
        'POST',
        isDevelopment ? SERVERS.development : SERVERS.production,
        '/domains/${pathParams.id}/verify',
        {...options, body},
    );
}
