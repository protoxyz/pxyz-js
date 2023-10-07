import { request, RequestOptions, AuthOptions } from '../request';
import { SERVERS } from '../servers';

export type ConnectionsUpdateConnectionResponse = {
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

export function updateConnection(
  auth: AuthOptions,
  options?: RequestOptions,
  development?: boolean,
): Promise<ConnectionsUpdateConnectionResponse> {
  return request<ConnectionsUpdateConnectionResponse>(
    auth,
    'PATCH',
    development ? SERVERS.development : SERVERS.production,
    '/user/connections/${pathParams.id}',
    options,
  );
}
