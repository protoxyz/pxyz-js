import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type NotificationsChannelsCreateChannelResponse = {
    id: string
    tenantId: string
    name: string
    key: string
    description: string
    type: string
    provider: string
    enabled: boolean
    providerSettings: Record<any, any>
    createdAt: string
    updatedAt: string
}

export function createChannel(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<NotificationsChannelsCreateChannelResponse> {
    return request<NotificationsChannelsCreateChannelResponse>(
        auth,
        'POST',
        development ? SERVERS.development : SERVERS.production,
        '/notifications/channels',
        options,
    );
}

