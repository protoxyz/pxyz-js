import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthPhoneNumbersVerifyPhoneNumberResponse = {
    id: string  
    tenantId: string  
    userId: string | null 
    phone: string  
    verifiedAt: string | null 
    createdAt: string  
    updatedAt: string  
}

export function verifyPhoneNumber(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<AuthPhoneNumbersVerifyPhoneNumberResponse> {
    return request<AuthPhoneNumbersVerifyPhoneNumberResponse>(
        auth,
        'POST',
        development ? SERVERS.development : SERVERS.production,
        '/auth/phone-numbers/verify',
        options,
    );
}
