import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthPhoneNumbersListPhoneNumbersResponse = {
    status: string  
    data: {
    id: string  
    tenantId: string  
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
export type AuthPhoneNumbersListPhoneNumbersInput = undefined;
export function listPhoneNumbers(
    auth: AuthOptions,
    body?: AuthPhoneNumbersListPhoneNumbersInput,
    options?: RequestOptions<AuthPhoneNumbersListPhoneNumbersInput>,
    development?: boolean,
): Promise<AuthPhoneNumbersListPhoneNumbersResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<AuthPhoneNumbersListPhoneNumbersInput, AuthPhoneNumbersListPhoneNumbersResponse>(
      auth,
      'GET',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/tenants/${pathParams.tenantId}/auth/phone-numbers',
      options,
  );
}

