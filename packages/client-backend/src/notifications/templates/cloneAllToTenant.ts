import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type NotificationsTemplatesCloneAllToTenantResponse = {
    successes: string []  
    failures: string []  
}

export function cloneAllToTenant(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<NotificationsTemplatesCloneAllToTenantResponse> {
    return request<NotificationsTemplatesCloneAllToTenantResponse>(
        auth,
        'POST',
        development ? SERVERS.development : SERVERS.production,
        '/notifications/templates/clone-all-to-tenant',
        options,
    );
}

