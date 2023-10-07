import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type NotificationsTemplatesTestResponse = unknown

export function test(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<NotificationsTemplatesTestResponse> {
    return request<NotificationsTemplatesTestResponse>(
        auth,
        'POST',
        development ? SERVERS.development : SERVERS.production,
        '/notifications/test',
        options,
    );
}

