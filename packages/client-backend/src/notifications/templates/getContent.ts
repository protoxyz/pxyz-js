import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type NotificationsTemplatesGetContentResponse = Record<any, any>

export function getContent(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<NotificationsTemplatesGetContentResponse> {
    return request<NotificationsTemplatesGetContentResponse>(
        auth,
        'GET',
        development ? SERVERS.development : SERVERS.production,
        '/notifications/templates/${pathParams.id}/content',
        options,
    );
}

