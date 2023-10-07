import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type NotificationsStatsNotificationsStatsResponse = {
    name: string
    value: number
    change: number
    changeType: string
}[]

export function notificationsStats(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<NotificationsStatsNotificationsStatsResponse> {
    return request<NotificationsStatsNotificationsStatsResponse>(
        auth,
        'GET',
        development ? SERVERS.development : SERVERS.production,
        '/notifications/stats',
        options,
    );
}

