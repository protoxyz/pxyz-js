import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthPhoneNumbersMakePrimaryPhoneNumberResponse = {
    id: string  
    tenantId: string  
    userId: string | null 
    phone: string  
    verifiedAt: string | null 
    createdAt: string  
    updatedAt: string  
}
export type AuthPhoneNumbersMakePrimaryPhoneNumberInput = {
    id: string  
};
export function makePrimaryPhoneNumber(
    auth: AuthOptions,
    body?: AuthPhoneNumbersMakePrimaryPhoneNumberInput,
    options?: RequestOptions<AuthPhoneNumbersMakePrimaryPhoneNumberInput>,
    development?: boolean,
): Promise<AuthPhoneNumbersMakePrimaryPhoneNumberResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<AuthPhoneNumbersMakePrimaryPhoneNumberInput, AuthPhoneNumbersMakePrimaryPhoneNumberResponse>(
      auth,
      'POST',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/auth/phone-numbers/make-primary',
      options,
  );
}

