import { request, RequestOptions, AuthOptions } from '../request';
import { SERVERS } from '../servers';

export type ConnectionsListConnectionsResponse = {
  status: string;
  error: string;
  data: {
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
  }[];
  meta: {
    total: number;
    count: number;
    numPages: number;
    perPage: number;
    prev: string;
    next: string;
  };
};

export function listConnections(
  auth: AuthOptions,
  options?: RequestOptions,
  development?: boolean,
): Promise<ConnectionsListConnectionsResponse> {
  return request<ConnectionsListConnectionsResponse>(
    auth,
    'GET',
    development ? SERVERS.development : SERVERS.production,
    '/user/connections',
    options,
  );
}
