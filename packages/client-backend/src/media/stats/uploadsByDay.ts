import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type MediaStatsUploadsByDayResponse = {
    date: string  
    count: number 
}[]

export function uploadsByDay(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<MediaStatsUploadsByDayResponse> {
    return request<MediaStatsUploadsByDayResponse>(
        auth,
        'GET',
        development ? SERVERS.development : SERVERS.production,
        '/media/stats/uploads-by-day',
        options,
    );
}

