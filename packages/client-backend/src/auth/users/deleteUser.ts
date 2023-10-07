import { request, RequestOptions, AuthOptions } from '../../request';
import { SERVERS } from '../../servers';

export type AuthUsersDeleteUserResponse = null | {
  id: string;
};

export function deleteUser(
  auth: AuthOptions,
  options?: RequestOptions,
  development?: boolean,
): Promise<AuthUsersDeleteUserResponse> {
  return request<AuthUsersDeleteUserResponse>(
    auth,
    'DELETE',
    development ? SERVERS.development : SERVERS.production,
    '/auth/users/${pathParams.id}',
    options,
  );
}
