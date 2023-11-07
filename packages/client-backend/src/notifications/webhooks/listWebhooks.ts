import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type NotificationsWebhooksListWebhooksResponse = {
    status: string  
    data: any[]  
}
export type NotificationsWebhooksListWebhooksInput = undefined;
export function listWebhooks(
    auth: AuthOptions,
    body?: NotificationsWebhooksListWebhooksInput,
    options?: RequestOptions<NotificationsWebhooksListWebhooksInput>,
    development?: boolean,
): Promise<NotificationsWebhooksListWebhooksResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<NotificationsWebhooksListWebhooksInput, NotificationsWebhooksListWebhooksResponse>(
      auth,
      'GET',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/tenants/${pathParams.tenantId}/notifications/webhooks',
      options,
  );
}

