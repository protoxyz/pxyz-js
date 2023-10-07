import { request, RequestOptions, AuthOptions } from '../../request';
import { SERVERS } from '../../servers';

export type NotificationsChannelsGetChannelResponse = {
  id: string;
  tenantId: string;
  name: string;
  key: string;
  description: string;
  type: string;
  provider: string;
  enabled: boolean;
  providerSettings: Record<any, any>;
  createdAt: string;
  updatedAt: string;
};

export function getChannel(
  auth: AuthOptions,
  options?: RequestOptions,
  development?: boolean,
): Promise<NotificationsChannelsGetChannelResponse> {
  return request<NotificationsChannelsGetChannelResponse>(
    auth,
    'GET',
    development ? SERVERS.development : SERVERS.production,
    '/notifications/channels/${pathParams.id}',
    options,
  );
}
