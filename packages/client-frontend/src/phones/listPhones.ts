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

export type PhonesListPhonesInput = undefined;

export function listPhones(
    auth: AuthOptions,
    body?: PhonesListPhonesInput,
    options?: RequestOptions<PhonesListPhonesInput>,
    development?: boolean,
): Promise<PhonesListPhonesResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
    return request<PhonesListPhonesInput, PhonesListPhonesResponse>(
        auth,
        'GET',
        isDevelopment ? SERVERS.development : SERVERS.production,
        '/user/phones',
        {...options, body},
    );
}
