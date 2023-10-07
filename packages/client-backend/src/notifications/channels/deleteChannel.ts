import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type NotificationsChannelsDeleteChannelResponse = {
    deleted: boolean
}

export function deleteChannel(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<NotificationsChannelsDeleteChannelResponse> {
    return request<NotificationsChannelsDeleteChannelResponse>(
        auth,
        'DELETE',
        development ? SERVERS.development : SERVERS.production,
        '/notifications/channels/${pathParams.id}',
        options,
    );
}

