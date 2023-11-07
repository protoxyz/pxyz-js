import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthUsersDeleteUserResponse = null | {
    id: string | null 
}
export type AuthUsersDeleteUserInput = undefined;
export function deleteUser(
    auth: AuthOptions,
    body?: AuthUsersDeleteUserInput,
    options?: RequestOptions<AuthUsersDeleteUserInput>,
    development?: boolean,
): Promise<AuthUsersDeleteUserResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<AuthUsersDeleteUserInput, AuthUsersDeleteUserResponse>(
      auth,
      'DELETE',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/auth/users/${pathParams.id}',
      options,
  );
}

