import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthEmailAddressesMakePrimaryEmailAddresseResponse = {
    id: string  
    tenantId: string  
    userId: string | null 
    email: string  
    verifiedAt: string | null 
    createdAt: string  
    updatedAt: string  
}
export type AuthEmailAddressesMakePrimaryEmailAddresseInput = {
    id: string  
};
export function makePrimaryEmailAddresse(
    auth: AuthOptions,
    body?: AuthEmailAddressesMakePrimaryEmailAddresseInput,
    options?: RequestOptions<AuthEmailAddressesMakePrimaryEmailAddresseInput>,
    development?: boolean,
): Promise<AuthEmailAddressesMakePrimaryEmailAddresseResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<AuthEmailAddressesMakePrimaryEmailAddresseInput, AuthEmailAddressesMakePrimaryEmailAddresseResponse>(
      auth,
      'POST',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/auth/email-addresses/make-primary',
      options,
  );
}

