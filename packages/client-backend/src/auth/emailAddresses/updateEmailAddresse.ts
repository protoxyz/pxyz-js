import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthEmailAddressesUpdateEmailAddresseResponse = {
    id: string  
    tenantId: string  
    userId: string | null 
    email: string  
    verifiedAt: string | null 
    createdAt: string  
    updatedAt: string  
}
export type AuthEmailAddressesUpdateEmailAddresseInput = {
    id: string  
    email: string  
};
export function updateEmailAddresse(
    auth: AuthOptions,
    body?: AuthEmailAddressesUpdateEmailAddresseInput,
    options?: RequestOptions<AuthEmailAddressesUpdateEmailAddresseInput>,
    development?: boolean,
): Promise<AuthEmailAddressesUpdateEmailAddresseResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<AuthEmailAddressesUpdateEmailAddresseInput, AuthEmailAddressesUpdateEmailAddresseResponse>(
      auth,
      'PUT',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/auth/email-addresses',
      options,
  );
}

