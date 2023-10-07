import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthPhoneNumbersMakePrimaryPhoneNumberResponse = {
    id: string  
    tenantId: string  
    userId: string | null 
    phone: string  
    verifiedAt: string | null 
    createdAt: string  
    updatedAt: string  
}

export function makePrimaryPhoneNumber(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<AuthPhoneNumbersMakePrimaryPhoneNumberResponse> {
    return request<AuthPhoneNumbersMakePrimaryPhoneNumberResponse>(
        auth,
        'POST',
        development ? SERVERS.development : SERVERS.production,
        '/auth/phone-numbers/make-primary',
        options,
    );
}

