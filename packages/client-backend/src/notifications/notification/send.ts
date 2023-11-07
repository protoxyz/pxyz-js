import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type NotificationsNotificationSendResponse = {
    status: string  
}
export type NotificationsNotificationSendInput = {
    tenantId: string  
    template: string  
    channel: string  
    variables: Record<any, any>  
    input: Record<any, any>  
};
export function send(
    auth: AuthOptions,
    body?: NotificationsNotificationSendInput,
    options?: RequestOptions<NotificationsNotificationSendInput>,
    development?: boolean,
): Promise<NotificationsNotificationSendResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<NotificationsNotificationSendInput, NotificationsNotificationSendResponse>(
      auth,
      'POST',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/notifications/send',
      options,
  );
}

