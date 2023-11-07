import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthEmailAddressesListEmailAddressesResponse = {
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
export type AuthEmailAddressesListEmailAddressesInput = undefined;
export function listEmailAddresses(
    auth: AuthOptions,
    body?: AuthEmailAddressesListEmailAddressesInput,
    options?: RequestOptions<AuthEmailAddressesListEmailAddressesInput>,
    development?: boolean,
): Promise<AuthEmailAddressesListEmailAddressesResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<AuthEmailAddressesListEmailAddressesInput, AuthEmailAddressesListEmailAddressesResponse>(
      auth,
      'GET',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/tenants/${pathParams.tenantId}/auth/email-addresses',
      options,
  );
}

