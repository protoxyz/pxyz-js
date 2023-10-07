import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthPhoneNumbersListPhoneNumbersByUserIdResponse = {
    status: string  
    data: {
    id: string  
    tenantId: string  
    userId: string | null 
    phone: string  
    verifiedAt: string | null 
    createdAt: string  
    updatedAt: string  
}[]  
    meta: {
    total: number  
    count: number  
    numPages: number  
    perPage: number  
    prev: string | null 
    next: string | null 
}  
}

export function listPhoneNumbersByUserId(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<AuthPhoneNumbersListPhoneNumbersByUserIdResponse> {
    return request<AuthPhoneNumbersListPhoneNumbersByUserIdResponse>(
        auth,
        'GET',
        development ? SERVERS.development : SERVERS.production,
        '/auth/users/${pathParams.userId}/phone-numbers',
        options,
    );
}

