import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type NotificationsTemplatesCreateTemplateResponse = {
    id: string
    tenantId: string
    name: string
    body: undefined
    subject: string
    type: string
    createdAt: string
    updatedAt: string
}

export function createTemplate(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<NotificationsTemplatesCreateTemplateResponse> {
    return request<NotificationsTemplatesCreateTemplateResponse>(
        auth,
        'POST',
        development ? SERVERS.development : SERVERS.production,
        '/notifications/templates',
        options,
    );
}

