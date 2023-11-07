import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthEmailAddressesVerifyEmailAddresseResponse = {
    id: string  
    tenantId: string  
    userId: string | null 
    email: string  
    verifiedAt: string | null 
    createdAt: string  
    updatedAt: string  
}
export type AuthEmailAddressesVerifyEmailAddresseInput = {
    id: string  
};
export function verifyEmailAddresse(
    auth: AuthOptions,
    body?: AuthEmailAddressesVerifyEmailAddresseInput,
    options?: RequestOptions<AuthEmailAddressesVerifyEmailAddresseInput>,
    development?: boolean,
): Promise<AuthEmailAddressesVerifyEmailAddresseResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<AuthEmailAddressesVerifyEmailAddresseInput, AuthEmailAddressesVerifyEmailAddresseResponse>(
      auth,
      'POST',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/auth/email-addresses/verify',
      options,
  );
}

