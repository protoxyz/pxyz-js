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

export type PhonesVerifyPhoneInput = {
    code: string  
};

export function verifyPhone(
    auth: AuthOptions,
    body?: PhonesVerifyPhoneInput,
    options?: RequestOptions<PhonesVerifyPhoneInput>,
    development?: boolean,
): Promise<PhonesVerifyPhoneResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
    return request<PhonesVerifyPhoneInput, PhonesVerifyPhoneResponse>(
        auth,
        'POST',
        isDevelopment ? SERVERS.development : SERVERS.production,
        '/user/phones/${pathParams.phoneId}/verify',
        {...options, body},
    );
}
