import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthSessionsDeleteSessionResponse = {
    deleted: boolean  
}
export type AuthSessionsDeleteSessionInput = undefined;
export function deleteSession(
    auth: AuthOptions,
    body?: AuthSessionsDeleteSessionInput,
    options?: RequestOptions<AuthSessionsDeleteSessionInput>,
    development?: boolean,
): Promise<AuthSessionsDeleteSessionResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<AuthSessionsDeleteSessionInput, AuthSessionsDeleteSessionResponse>(
      auth,
      'DELETE',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/auth/sessions/${pathParams.id}',
      options,
  );
}

