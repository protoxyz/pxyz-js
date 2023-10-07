import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type NotificationsTemplatesUpdateContentResponse = Record<any, any>

export function updateContent(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<NotificationsTemplatesUpdateContentResponse> {
    return request<NotificationsTemplatesUpdateContentResponse>(
        auth,
        'PUT',
        development ? SERVERS.development : SERVERS.production,
        '/notifications/templates/${pathParams.id}/content',
        options,
    );
}

