import { request, RequestOptions, AuthOptions } from "../request";
import { SERVERS } from "../servers";

export type PhonesCreatePhoneResponse = {
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

export function createPhone(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<PhonesCreatePhoneResponse> {
    return request<PhonesCreatePhoneResponse>(
        auth,
        'POST',
        development ? SERVERS.development : SERVERS.production,
        '/user/phones',
        options,
    );
}
