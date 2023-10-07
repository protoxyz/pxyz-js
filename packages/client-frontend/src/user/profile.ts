import { request, RequestOptions, AuthOptions } from "../request";
import { SERVERS } from "../servers";

export type UserProfileResponse = {
    status: string  
    error: string | null 
    data: {
    user: {
    id: string  
    name: string | null 
    username: string | null 
    imageUri: string | null 
    lastSignInAt: string | null 
    lastActiveAt: string | null 
    status: string | null 
    roleId: string | null 
    role: {
    id: string  
    name: string  
    description: string | null 
    permissions: string []  
} | null 
    primaryEmailId: string | null 
    primaryPhoneId: string | null 
    emailAddresses: {
    id: string  
    email: string  
    verifiedAt: string | null 
    createdAt: string  
}[]  
    phoneNumbers: {
    id: string  
    phone: string  
    verifiedAt: string | null 
    createdAt: string  
}[]  
    connections: {
    id: string  
    status: string  
    socialProviderId: string  
    socialProvider: {
    providerKey: string  
} | null 
    providerId: string | null 
    scope: string | null 
    createdAt: string  
    updatedAt: string  
}[]  
    organizations: {
    id: string  
    name: string  
    slug: string  
    creatorId: string | null 
    description: string | null 
    logoUri: string | null 
    iconUri: string | null 
    membership: {
    id: string  
    publicMeta: Record<any, any>  
    roleId: string | null 
    role: {
    name: string  
    description: string | null 
    permissions: string [] | null 
} | null 
}  
    createdAt: string  
    updatedAt: string  
}[]  
    publicMeta: Record<any, any>  
    timezone: string | null 
    locale: string | null 
    createdAt: string  
    updatedAt: string  
} | null 
} | null 
}

export function profile(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<UserProfileResponse> {
    return request<UserProfileResponse>(
        auth,
        'GET',
        development ? SERVERS.development : SERVERS.production,
        '/user/profile',
        options,
    );
}
