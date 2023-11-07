import { request, RequestOptions, AuthOptions } from "../request";
import { SERVERS } from "../servers";

export type PhonesPreparePhoneResponse = {
    status: string  
    error: string | null 
}

export type PhonesPreparePhoneInput = undefined;

export function preparePhone(
    auth: AuthOptions,
    body?: PhonesPreparePhoneInput,
    options?: RequestOptions<PhonesPreparePhoneInput>,
    development?: boolean,
): Promise<PhonesPreparePhoneResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
    return request<PhonesPreparePhoneInput, PhonesPreparePhoneResponse>(
        auth,
        'POST',
        isDevelopment ? SERVERS.development : SERVERS.production,
        '/user/phones/${pathParams.phoneId}/resend',
        {...options, body},
    );
}
