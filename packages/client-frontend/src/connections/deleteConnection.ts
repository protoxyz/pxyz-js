import { request, RequestOptions, AuthOptions } from '../request';
import { SERVERS } from '../servers';

export type ConnectionsDeleteConnectionResponse = {
  status: string;
  error: string;
  data: {
    connection: {
      id: string;
      status: string;
      socialProviderId: string;
      socialProvider: {
        providerKey: string;
      };
      providerId: string;
      scope: string;
      createdAt: string;
      updatedAt: string;
    };
  };
};

export function deleteConnection(
  auth: AuthOptions,
  options?: RequestOptions,
  development?: boolean,
): Promise<ConnectionsDeleteConnectionResponse> {
  return request<ConnectionsDeleteConnectionResponse>(
    auth,
    'DELETE',
    development ? SERVERS.development : SERVERS.production,
    '/user/connections/${pathParams.id}',
    options,
  );
}
