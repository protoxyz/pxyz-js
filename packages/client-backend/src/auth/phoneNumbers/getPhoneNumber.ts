import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthPhoneNumbersGetPhoneNumberResponse = {
    id: string  
    tenantId: string  
    userId: string | null 
    phone: string  
    verifiedAt: string | null 
    createdAt: string  
    updatedAt: string  
}

export function getPhoneNumber(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<AuthPhoneNumbersGetPhoneNumberResponse> {
    return request<AuthPhoneNumbersGetPhoneNumberResponse>(
        auth,
        'GET',
        development ? SERVERS.development : SERVERS.production,
        '/auth/phone-numbers/${pathParams.id}',
        options,
    );
}

