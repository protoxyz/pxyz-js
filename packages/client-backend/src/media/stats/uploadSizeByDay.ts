import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type MediaStatsUploadSizeByDayResponse = {
    date: string
    size: number
}[]

export function uploadSizeByDay(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<MediaStatsUploadSizeByDayResponse> {
    return request<MediaStatsUploadSizeByDayResponse>(
        auth,
        'GET',
        development ? SERVERS.development : SERVERS.production,
        '/media/stats/upload-size-by-day',
        options,
    );
}

