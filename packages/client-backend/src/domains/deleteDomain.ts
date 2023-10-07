import { request, RequestOptions, AuthOptions } from "../request";
import { SERVERS } from "../servers";

export type DomainsDeleteDomainResponse = boolean

export function deleteDomain(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<DomainsDeleteDomainResponse> {
    return request<DomainsDeleteDomainResponse>(
        auth,
        'DELETE',
        development ? SERVERS.development : SERVERS.production,
        '/domains/${pathParams.id}',
        options,
    );
}
