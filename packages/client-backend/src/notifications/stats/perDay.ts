import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type NotificationsStatsPerDayResponse = {
    day: string  
    count: number 
}[]
export type NotificationsStatsPerDayInput = undefined;
export function perDay(
    auth: AuthOptions,
    body?: NotificationsStatsPerDayInput,
    options?: RequestOptions<NotificationsStatsPerDayInput>,
    development?: boolean,
): Promise<NotificationsStatsPerDayResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<NotificationsStatsPerDayInput, NotificationsStatsPerDayResponse>(
      auth,
      'GET',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/notifications/stats/day',
      options,
  );
}

