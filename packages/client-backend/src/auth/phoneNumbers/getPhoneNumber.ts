import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthPhoneNumbersGetPhoneNumberResponse = {
    id: string  
    tenantId: string  
    userId: string | null 
    phone: string  
    verifiedAt: string | null 
    createdAt: string  
    updatedAt: string  
}
export type AuthPhoneNumbersGetPhoneNumberInput = undefined;
export function getPhoneNumber(
    auth: AuthOptions,
    body?: AuthPhoneNumbersGetPhoneNumberInput,
    options?: RequestOptions<AuthPhoneNumbersGetPhoneNumberInput>,
    development?: boolean,
): Promise<AuthPhoneNumbersGetPhoneNumberResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<AuthPhoneNumbersGetPhoneNumberInput, AuthPhoneNumbersGetPhoneNumberResponse>(
      auth,
      'GET',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/auth/phone-numbers/${pathParams.id}',
      options,
  );
}

