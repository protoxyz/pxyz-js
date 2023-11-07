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

export type DomainsListDomainsInput = undefined;

export function listDomains(
    auth: AuthOptions,
    body?: DomainsListDomainsInput,
    options?: RequestOptions<DomainsListDomainsInput>,
    development?: boolean,
): Promise<DomainsListDomainsResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
    return request<DomainsListDomainsInput, DomainsListDomainsResponse>(
        auth,
        'GET',
        isDevelopment ? SERVERS.development : SERVERS.production,
        '/domains',
        {...options, body},
    );
}
