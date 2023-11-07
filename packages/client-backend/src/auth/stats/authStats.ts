import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthStatsAuthStatsResponse = {
    name: string  | string  | string  | string  
    value: number 
    change: number 
    changeType: string  | string  | string  
}[]
export type AuthStatsAuthStatsInput = undefined;
export function authStats(
    auth: AuthOptions,
    body?: AuthStatsAuthStatsInput,
    options?: RequestOptions<AuthStatsAuthStatsInput>,
    development?: boolean,
): Promise<AuthStatsAuthStatsResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<AuthStatsAuthStatsInput, AuthStatsAuthStatsResponse>(
      auth,
      'GET',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/auth/stats',
      options,
  );
}

