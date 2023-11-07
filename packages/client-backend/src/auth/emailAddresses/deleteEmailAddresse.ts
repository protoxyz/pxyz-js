import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthEmailAddressesDeleteEmailAddresseResponse = {
    deleted: boolean  
}
export type AuthEmailAddressesDeleteEmailAddresseInput = undefined;
export function deleteEmailAddresse(
    auth: AuthOptions,
    body?: AuthEmailAddressesDeleteEmailAddresseInput,
    options?: RequestOptions<AuthEmailAddressesDeleteEmailAddresseInput>,
    development?: boolean,
): Promise<AuthEmailAddressesDeleteEmailAddresseResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<AuthEmailAddressesDeleteEmailAddresseInput, AuthEmailAddressesDeleteEmailAddresseResponse>(
      auth,
      'DELETE',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/auth/email-addresses',
      options,
  );
}

