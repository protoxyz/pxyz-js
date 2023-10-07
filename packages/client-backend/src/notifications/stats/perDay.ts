import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type NotificationsStatsPerDayResponse = {
    day: string
    count: number
}[]

export function perDay(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<NotificationsStatsPerDayResponse> {
    return request<NotificationsStatsPerDayResponse>(
        auth,
        'GET',
        development ? SERVERS.development : SERVERS.production,
        '/notifications/stats/day',
        options,
    );
}

