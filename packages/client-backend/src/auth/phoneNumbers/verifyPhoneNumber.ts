import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthPhoneNumbersVerifyPhoneNumberResponse = {
    id: string  
    tenantId: string  
    userId: string | null 
    phone: string  
    verifiedAt: string | null 
    createdAt: string  
    updatedAt: string  
}
export type AuthPhoneNumbersVerifyPhoneNumberInput = {
    id: string  
};
export function verifyPhoneNumber(
    auth: AuthOptions,
    body?: AuthPhoneNumbersVerifyPhoneNumberInput,
    options?: RequestOptions<AuthPhoneNumbersVerifyPhoneNumberInput>,
    development?: boolean,
): Promise<AuthPhoneNumbersVerifyPhoneNumberResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<AuthPhoneNumbersVerifyPhoneNumberInput, AuthPhoneNumbersVerifyPhoneNumberResponse>(
      auth,
      'POST',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/auth/phone-numbers/verify',
      options,
  );
}

