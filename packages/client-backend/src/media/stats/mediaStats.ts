import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type MediaStatsMediaStatsResponse = {
    name: string  
    value: number 
    unit: string  | null
    change: number 
    changeType: string  
}[]
export type MediaStatsMediaStatsInput = undefined;
export function mediaStats(
    auth: AuthOptions,
    body?: MediaStatsMediaStatsInput,
    options?: RequestOptions<MediaStatsMediaStatsInput>,
    development?: boolean,
): Promise<MediaStatsMediaStatsResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<MediaStatsMediaStatsInput, MediaStatsMediaStatsResponse>(
      auth,
      'GET',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/media/stats',
      options,
  );
}

