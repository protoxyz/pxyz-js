import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthStatsSignUpsByDayResponse = {
    date: string
    count: number
}[]

export function signUpsByDay(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<AuthStatsSignUpsByDayResponse> {
    return request<AuthStatsSignUpsByDayResponse>(
        auth,
        'GET',
        development ? SERVERS.development : SERVERS.production,
        '/auth/stats/sign-ups-by-day',
        options,
    );
}

