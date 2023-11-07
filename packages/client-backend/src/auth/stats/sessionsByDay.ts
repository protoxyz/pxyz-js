import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthStatsSessionsByDayResponse = {
    date: string  
    count: number 
}[]
export type AuthStatsSessionsByDayInput = undefined;
export function sessionsByDay(
    auth: AuthOptions,
    body?: AuthStatsSessionsByDayInput,
    options?: RequestOptions<AuthStatsSessionsByDayInput>,
    development?: boolean,
): Promise<AuthStatsSessionsByDayResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<AuthStatsSessionsByDayInput, AuthStatsSessionsByDayResponse>(
      auth,
      'GET',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/auth/stats/sessions-by-day',
      options,
  );
}

