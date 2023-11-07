import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type NotificationsStatsNotificationsStatsResponse = {
    name: string  
    value: number 
    change: number 
    changeType: string  
}[]
export type NotificationsStatsNotificationsStatsInput = undefined;
export function notificationsStats(
    auth: AuthOptions,
    body?: NotificationsStatsNotificationsStatsInput,
    options?: RequestOptions<NotificationsStatsNotificationsStatsInput>,
    development?: boolean,
): Promise<NotificationsStatsNotificationsStatsResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<NotificationsStatsNotificationsStatsInput, NotificationsStatsNotificationsStatsResponse>(
      auth,
      'GET',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/notifications/stats',
      options,
  );
}

