import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type NotificationsTemplatesDeleteTemplateResponse = {
    deleted: boolean  
}

export function deleteTemplate(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<NotificationsTemplatesDeleteTemplateResponse> {
    return request<NotificationsTemplatesDeleteTemplateResponse>(
        auth,
        'DELETE',
        development ? SERVERS.development : SERVERS.production,
        '/notifications/templates/${pathParams.id}',
        options,
    );
}

