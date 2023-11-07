import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type NotificationsSmsListSmsResponse = {
    status: string  
    data: any[]  
}
export type NotificationsSmsListSmsInput = undefined;
export function listSms(
    auth: AuthOptions,
    body?: NotificationsSmsListSmsInput,
    options?: RequestOptions<NotificationsSmsListSmsInput>,
    development?: boolean,
): Promise<NotificationsSmsListSmsResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<NotificationsSmsListSmsInput, NotificationsSmsListSmsResponse>(
      auth,
      'GET',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/tenants/${pathParams.tenantId}/notifications/sms',
      options,
  );
}

