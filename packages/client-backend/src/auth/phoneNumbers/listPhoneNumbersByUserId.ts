import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthPhoneNumbersListPhoneNumbersByUserIdResponse = {
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
export type AuthPhoneNumbersListPhoneNumbersByUserIdInput = undefined;
export function listPhoneNumbersByUserId(
    auth: AuthOptions,
    body?: AuthPhoneNumbersListPhoneNumbersByUserIdInput,
    options?: RequestOptions<AuthPhoneNumbersListPhoneNumbersByUserIdInput>,
    development?: boolean,
): Promise<AuthPhoneNumbersListPhoneNumbersByUserIdResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<AuthPhoneNumbersListPhoneNumbersByUserIdInput, AuthPhoneNumbersListPhoneNumbersByUserIdResponse>(
      auth,
      'GET',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/auth/users/${pathParams.userId}/phone-numbers',
      options,
  );
}

