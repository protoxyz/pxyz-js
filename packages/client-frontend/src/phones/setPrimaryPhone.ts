import { request, RequestOptions, AuthOptions } from "../request";
import { SERVERS } from "../servers";

export type PhonesSetPrimaryPhoneResponse = {
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

export function setPrimaryPhone(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<PhonesSetPrimaryPhoneResponse> {
    return request<PhonesSetPrimaryPhoneResponse>(
        auth,
        'POST',
        development ? SERVERS.development : SERVERS.production,
        '/user/phones/${pathParams.phoneId}/primary',
        options,
    );
}
