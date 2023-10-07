import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthUsersCreateUserResponse = {
    id: string
    tenantId: string
    name: string
    imageUri: string
    lastSignInAt: string
    lastActiveAt: string
    username: string
    status: string
    roleId: string
    role: {
    id: string
    name: string
    description: string
    permissions: string[]
}
    primaryEmailId: string
    primaryPhoneId: string
    emailAddresses: {
    id: string
    tenantId: string
    userId: string
    email: string
    verifiedAt: string
    createdAt: string
    updatedAt: string
}[]
    phoneNumbers: {
    id: string
    tenantId: string
    userId: string
    phone: string
    verifiedAt: string
    createdAt: string
    updatedAt: string
}[]
    publicMeta: undefined
    privateMeta: undefined
    createdAt: string
    updatedAt: string
}

export function createUser(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<AuthUsersCreateUserResponse> {
    return request<AuthUsersCreateUserResponse>(
        auth,
        'POST',
        development ? SERVERS.development : SERVERS.production,
        '/auth/users',
        options,
    );
}

