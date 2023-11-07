import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthEmailAddressesGetEmailAddresseResponse = {
    id: string  
    tenantId: string  
    userId: string | null 
    email: string  
    verifiedAt: string | null 
    createdAt: string  
    updatedAt: string  
}
export type AuthEmailAddressesGetEmailAddresseInput = undefined;
export function getEmailAddresse(
    auth: AuthOptions,
    body?: AuthEmailAddressesGetEmailAddresseInput,
    options?: RequestOptions<AuthEmailAddressesGetEmailAddresseInput>,
    development?: boolean,
): Promise<AuthEmailAddressesGetEmailAddresseResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<AuthEmailAddressesGetEmailAddresseInput, AuthEmailAddressesGetEmailAddresseResponse>(
      auth,
      'GET',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/auth/email-addresses/${pathParams.id}',
      options,
  );
}

