import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthPhoneNumbersCreatePhoneNumberResponse = {
    id: string  
    tenantId: string  
    userId: string | null 
    phone: string  
    verifiedAt: string | null 
    createdAt: string  
    updatedAt: string  
}

export function createPhoneNumber(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<AuthPhoneNumbersCreatePhoneNumberResponse> {
    return request<AuthPhoneNumbersCreatePhoneNumberResponse>(
        auth,
        'POST',
        development ? SERVERS.development : SERVERS.production,
        '/auth/phone-numbers',
        options,
    );
}

