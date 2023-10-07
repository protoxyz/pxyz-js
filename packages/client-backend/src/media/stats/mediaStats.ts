import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type MediaStatsMediaStatsResponse = {
    name: string
    value: number
    unit: string
    change: number
    changeType: string
}[]

export function mediaStats(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<MediaStatsMediaStatsResponse> {
    return request<MediaStatsMediaStatsResponse>(
        auth,
        'GET',
        development ? SERVERS.development : SERVERS.production,
        '/media/stats',
        options,
    );
}

