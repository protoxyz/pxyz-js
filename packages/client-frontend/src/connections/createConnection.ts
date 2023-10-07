import { request, RequestOptions, AuthOptions } from '../request';
import { SERVERS } from '../servers';

export type ConnectionsCreateConnectionResponse = {
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

export function createConnection(
  auth: AuthOptions,
  options?: RequestOptions,
  development?: boolean,
): Promise<ConnectionsCreateConnectionResponse> {
  return request<ConnectionsCreateConnectionResponse>(
    auth,
    'POST',
    development ? SERVERS.development : SERVERS.production,
    '/user/connections',
    options,
  );
}
