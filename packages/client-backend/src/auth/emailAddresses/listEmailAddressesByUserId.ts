import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthEmailAddressesListEmailAddressesByUserIdResponse = {
    status: string  
    data: {
    id: string  
    tenantId: string  
    userId: string | null 
    email: string  
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
export type AuthEmailAddressesListEmailAddressesByUserIdInput = undefined;
export function listEmailAddressesByUserId(
    auth: AuthOptions,
    body?: AuthEmailAddressesListEmailAddressesByUserIdInput,
    options?: RequestOptions<AuthEmailAddressesListEmailAddressesByUserIdInput>,
    development?: boolean,
): Promise<AuthEmailAddressesListEmailAddressesByUserIdResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<AuthEmailAddressesListEmailAddressesByUserIdInput, AuthEmailAddressesListEmailAddressesByUserIdResponse>(
      auth,
      'GET',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/auth/users/${pathParams.userId}/email-addresses',
      options,
  );
}

