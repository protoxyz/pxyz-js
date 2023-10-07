import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthStatsRecentSignUpsResponse = {
    id: string
    tenantId: string
    name: string
    imageUri: string
    lastSignInAt: string
    lastActiveAt: string
    username: string
    status: string
    roleId: string
    role: object
    primaryEmailId: string
    primaryPhoneId: string
    emailAddresses: array
    phoneNumbers: array
    publicMeta: undefined
    privateMeta: undefined
    createdAt: string
    updatedAt: string
}[]

export function recentSignUps(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<AuthStatsRecentSignUpsResponse> {
    return request<AuthStatsRecentSignUpsResponse>(
        auth,
        'GET',
        development ? SERVERS.development : SERVERS.production,
        '/auth/stats/recent-sign-ups',
        options,
    );
}

