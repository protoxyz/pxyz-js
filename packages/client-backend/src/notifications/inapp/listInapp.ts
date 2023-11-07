import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type NotificationsInappListInappResponse = {
    status: string  
    data: any[]  
}
export type NotificationsInappListInappInput = undefined;
export function listInapp(
    auth: AuthOptions,
    body?: NotificationsInappListInappInput,
    options?: RequestOptions<NotificationsInappListInappInput>,
    development?: boolean,
): Promise<NotificationsInappListInappResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<NotificationsInappListInappInput, NotificationsInappListInappResponse>(
      auth,
      'GET',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/tenants/${pathParams.tenantId}/notifications/inapp',
      options,
  );
}

