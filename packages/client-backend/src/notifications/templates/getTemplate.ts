import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type NotificationsTemplatesGetTemplateResponse = {
    id: string
    tenantId: string
    name: string
    body: undefined
    subject: string
    type: string
    createdAt: string
    updatedAt: string
}

export function getTemplate(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<NotificationsTemplatesGetTemplateResponse> {
    return request<NotificationsTemplatesGetTemplateResponse>(
        auth,
        'GET',
        development ? SERVERS.development : SERVERS.production,
        '/notifications/templates/${pathParams.id}',
        options,
    );
}

