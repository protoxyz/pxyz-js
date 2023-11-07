import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type NotificationsPushListPushResponse = {
    status: string  
    data: any[]  
}
export type NotificationsPushListPushInput = undefined;
export function listPush(
    auth: AuthOptions,
    body?: NotificationsPushListPushInput,
    options?: RequestOptions<NotificationsPushListPushInput>,
    development?: boolean,
): Promise<NotificationsPushListPushResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<NotificationsPushListPushInput, NotificationsPushListPushResponse>(
      auth,
      'GET',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/tenants/${pathParams.tenantId}/notifications/push',
      options,
  );
}

