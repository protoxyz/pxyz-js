import { request, RequestOptions, AuthOptions } from "../request";
import { SERVERS } from "../servers";

export type TenantsGetBySlugResponse = {
    id: string
    name: string
    slug: string
    publicKey: string
    logoId: string
    logoUri: string
    iconId: string
    iconUri: string
    environment: string
    createdAt: string
    updatedAt: string
}

export function getBySlug(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<TenantsGetBySlugResponse> {
    return request<TenantsGetBySlugResponse>(
        auth,
        'GET',
        development ? SERVERS.development : SERVERS.production,
        '/tenants/slug/${pathParams.slug}',
        options,
    );
}
