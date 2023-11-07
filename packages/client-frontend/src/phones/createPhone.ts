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

export type PhonesCreatePhoneInput = {
    phone: string  
};

export function createPhone(
    auth: AuthOptions,
    body?: PhonesCreatePhoneInput,
    options?: RequestOptions<PhonesCreatePhoneInput>,
    development?: boolean,
): Promise<PhonesCreatePhoneResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
    return request<PhonesCreatePhoneInput, PhonesCreatePhoneResponse>(
        auth,
        'POST',
        isDevelopment ? SERVERS.development : SERVERS.production,
        '/user/phones',
        {...options, body},
    );
}
