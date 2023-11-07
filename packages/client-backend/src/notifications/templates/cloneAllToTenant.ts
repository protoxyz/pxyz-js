import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type NotificationsTemplatesCloneAllToTenantResponse = {
    successes: string []  
    failures: string []  
}
export type NotificationsTemplatesCloneAllToTenantInput = {
    fromTenantId: string  
    toTenantId: string  
};
export function cloneAllToTenant(
    auth: AuthOptions,
    body?: NotificationsTemplatesCloneAllToTenantInput,
    options?: RequestOptions<NotificationsTemplatesCloneAllToTenantInput>,
    development?: boolean,
): Promise<NotificationsTemplatesCloneAllToTenantResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<NotificationsTemplatesCloneAllToTenantInput, NotificationsTemplatesCloneAllToTenantResponse>(
      auth,
      'POST',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/notifications/templates/clone-all-to-tenant',
      options,
  );
}

