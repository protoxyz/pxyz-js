import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type MediaStatsUploadSizeByDayResponse = {
    date: string  
    size: number 
}[]
export type MediaStatsUploadSizeByDayInput = undefined;
export function uploadSizeByDay(
    auth: AuthOptions,
    body?: MediaStatsUploadSizeByDayInput,
    options?: RequestOptions<MediaStatsUploadSizeByDayInput>,
    development?: boolean,
): Promise<MediaStatsUploadSizeByDayResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<MediaStatsUploadSizeByDayInput, MediaStatsUploadSizeByDayResponse>(
      auth,
      'GET',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/media/stats/upload-size-by-day',
      options,
  );
}

