import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthStatsAuthStatsResponse = {
    name: string  | string  | string  | string  
    value: number 
    change: number 
    changeType: string  | string  | string  
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

