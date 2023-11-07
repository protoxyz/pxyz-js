import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthPhoneNumbersCreatePhoneNumberResponse = {
    id: string  
    tenantId: string  
    userId: string | null 
    phone: string  
    verifiedAt: string | null 
    createdAt: string  
    updatedAt: string  
}
export type AuthPhoneNumbersCreatePhoneNumberInput = {
    tenantId: string  
    userId: string  
    phone: string  
};
export function createPhoneNumber(
    auth: AuthOptions,
    body?: AuthPhoneNumbersCreatePhoneNumberInput,
    options?: RequestOptions<AuthPhoneNumbersCreatePhoneNumberInput>,
    development?: boolean,
): Promise<AuthPhoneNumbersCreatePhoneNumberResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<AuthPhoneNumbersCreatePhoneNumberInput, AuthPhoneNumbersCreatePhoneNumberResponse>(
      auth,
      'POST',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/auth/phone-numbers',
      options,
  );
}

