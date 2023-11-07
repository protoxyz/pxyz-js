import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type ContentStatsContentStatsResponse = {
    name: string  
    value: number 
    unit: string  | null
    change: number 
    changeType: string  
}[]
export type ContentStatsContentStatsInput = undefined;
export function contentStats(
    auth: AuthOptions,
    body?: ContentStatsContentStatsInput,
    options?: RequestOptions<ContentStatsContentStatsInput>,
    development?: boolean,
): Promise<ContentStatsContentStatsResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<ContentStatsContentStatsInput, ContentStatsContentStatsResponse>(
      auth,
      'GET',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/content/stats',
      options,
  );
}

