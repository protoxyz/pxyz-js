import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type MediaStatsUploadsByDayResponse = {
    date: string  
    count: number 
}[]
export type MediaStatsUploadsByDayInput = undefined;
export function uploadsByDay(
    auth: AuthOptions,
    body?: MediaStatsUploadsByDayInput,
    options?: RequestOptions<MediaStatsUploadsByDayInput>,
    development?: boolean,
): Promise<MediaStatsUploadsByDayResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<MediaStatsUploadsByDayInput, MediaStatsUploadsByDayResponse>(
      auth,
      'GET',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/media/stats/uploads-by-day',
      options,
  );
}

