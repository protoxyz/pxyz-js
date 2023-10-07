import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthStatsRecentSignInsResponse = {
    id: string
    browser: string
    device: string
    engine: string
    os: string
    cpu: string
    ua: string
    ip: string
    tenantId: string
    userId: string
    user: undefined
    signInAttemptId: string
    signInAttempt: object
    signUpAttemptId: string
    signUpAttempt: object
    expiresAt: string
    createdAt: string
    updatedAt: string
}[]

export function recentSignIns(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<AuthStatsRecentSignInsResponse> {
    return request<AuthStatsRecentSignInsResponse>(
        auth,
        'GET',
        development ? SERVERS.development : SERVERS.production,
        '/auth/stats/recent-sign-ins',
        options,
    );
}

