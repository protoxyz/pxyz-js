import { request, RequestOptions, AuthOptions } from '../../request';
import { SERVERS } from '../../servers';

export type AuthStatsSessionsByDayResponse = {
  date: string;
  count: number;
}[];

export function sessionsByDay(
  auth: AuthOptions,
  options?: RequestOptions,
  development?: boolean,
): Promise<AuthStatsSessionsByDayResponse> {
  return request<AuthStatsSessionsByDayResponse>(
    auth,
    'GET',
    development ? SERVERS.development : SERVERS.production,
    '/auth/stats/sessions-by-day',
    options,
  );
}
