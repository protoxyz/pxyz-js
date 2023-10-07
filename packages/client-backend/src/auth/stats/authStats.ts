import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthStatsAuthStatsResponse = {
    name: undefined
    value: number
    change: number
    changeType: undefined
}[]

export function authStats(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<AuthStatsAuthStatsResponse> {
    return request<AuthStatsAuthStatsResponse>(
        auth,
        'GET',
        development ? SERVERS.development : SERVERS.production,
        '/auth/stats',
        options,
    );
}

