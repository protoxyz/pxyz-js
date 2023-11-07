import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthEmailAddressesCreateEmailAddresseResponse = {
    id: string  
    tenantId: string  
    userId: string | null 
    email: string  
    verifiedAt: string | null 
    createdAt: string  
    updatedAt: string  
}
export type AuthEmailAddressesCreateEmailAddresseInput = {
    email: string  
    userId: string  
    tenantId: string  
};
export function createEmailAddresse(
    auth: AuthOptions,
    body?: AuthEmailAddressesCreateEmailAddresseInput,
    options?: RequestOptions<AuthEmailAddressesCreateEmailAddresseInput>,
    development?: boolean,
): Promise<AuthEmailAddressesCreateEmailAddresseResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<AuthEmailAddressesCreateEmailAddresseInput, AuthEmailAddressesCreateEmailAddresseResponse>(
      auth,
      'POST',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/auth/email-addresses',
      options,
  );
}

