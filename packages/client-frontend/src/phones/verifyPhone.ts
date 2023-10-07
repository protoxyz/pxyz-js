import { request, RequestOptions, AuthOptions } from "../request";
import { SERVERS } from "../servers";

export type PhonesVerifyPhoneResponse = {
    status: string  
    error: string | null 
    data: {
    phoneNumber: {
    id: string  
    userId: string | null 
    phone: string  
    verifiedAt: string | null 
    createdAt: string  
    updatedAt: string  
}  
} | null 
}

export function verifyPhone(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<PhonesVerifyPhoneResponse> {
    return request<PhonesVerifyPhoneResponse>(
        auth,
        'POST',
        development ? SERVERS.development : SERVERS.production,
        '/user/phones/${pathParams.phoneId}/verify',
        options,
    );
}
