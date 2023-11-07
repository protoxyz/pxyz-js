import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthPhoneNumbersDeletePhoneNumberResponse = {
    deleted: boolean  
}
export type AuthPhoneNumbersDeletePhoneNumberInput = undefined;
export function deletePhoneNumber(
    auth: AuthOptions,
    body?: AuthPhoneNumbersDeletePhoneNumberInput,
    options?: RequestOptions<AuthPhoneNumbersDeletePhoneNumberInput>,
    development?: boolean,
): Promise<AuthPhoneNumbersDeletePhoneNumberResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<AuthPhoneNumbersDeletePhoneNumberInput, AuthPhoneNumbersDeletePhoneNumberResponse>(
      auth,
      'DELETE',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/auth/phone-numbers',
      options,
  );
}

