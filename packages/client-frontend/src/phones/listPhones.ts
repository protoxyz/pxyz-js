import { request, RequestOptions, AuthOptions } from "../request";
import { SERVERS } from "../servers";

export type PhonesListPhonesResponse = {
    status: string  
    error: string | null 
    data: {
    id: string  
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

export function listPhones(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<PhonesListPhonesResponse> {
    return request<PhonesListPhonesResponse>(
        auth,
        'GET',
        development ? SERVERS.development : SERVERS.production,
        '/user/phones',
        options,
    );
}
