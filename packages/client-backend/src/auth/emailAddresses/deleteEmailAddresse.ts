import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthEmailAddressesDeleteEmailAddresseResponse = {
    deleted: boolean
}

export function deleteEmailAddresse(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<AuthEmailAddressesDeleteEmailAddresseResponse> {
    return request<AuthEmailAddressesDeleteEmailAddresseResponse>(
        auth,
        'DELETE',
        development ? SERVERS.development : SERVERS.production,
        '/auth/email-addresses',
        options,
    );
}

