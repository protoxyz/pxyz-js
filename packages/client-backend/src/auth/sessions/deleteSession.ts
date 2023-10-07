import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthSessionsDeleteSessionResponse = {
    deleted: boolean  
}

export function deleteSession(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<AuthSessionsDeleteSessionResponse> {
    return request<AuthSessionsDeleteSessionResponse>(
        auth,
        'DELETE',
        development ? SERVERS.development : SERVERS.production,
        '/auth/sessions/${pathParams.id}',
        options,
    );
}

