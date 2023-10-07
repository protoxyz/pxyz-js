import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthPhoneNumbersListPhoneNumbersResponse = {
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

export function listPhoneNumbers(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<AuthPhoneNumbersListPhoneNumbersResponse> {
    return request<AuthPhoneNumbersListPhoneNumbersResponse>(
        auth,
        'GET',
        development ? SERVERS.development : SERVERS.production,
        '/tenants/${pathParams.tenantId}/auth/phone-numbers',
        options,
    );
}

