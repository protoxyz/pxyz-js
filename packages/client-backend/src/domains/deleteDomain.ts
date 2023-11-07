import { request, RequestOptions, AuthOptions } from "../request";
import { SERVERS } from "../servers";

export type DomainsDeleteDomainResponse = boolean

export type DomainsDeleteDomainInput = undefined;

export function deleteDomain(
    auth: AuthOptions,
    body?: DomainsDeleteDomainInput,
    options?: RequestOptions<DomainsDeleteDomainInput>,
    development?: boolean,
): Promise<DomainsDeleteDomainResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
    return request<DomainsDeleteDomainInput, DomainsDeleteDomainResponse>(
        auth,
        'DELETE',
        isDevelopment ? SERVERS.development : SERVERS.production,
        '/domains/${pathParams.id}',
        {...options, body},
    );
}
