import { request, RequestOptions, AuthOptions } from '../../request';
import { SERVERS } from '../../servers';

export type NotificationsChannelsUpdateChannelResponse = {
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

export function updateChannel(
  auth: AuthOptions,
  options?: RequestOptions,
  development?: boolean,
): Promise<NotificationsChannelsUpdateChannelResponse> {
  return request<NotificationsChannelsUpdateChannelResponse>(
    auth,
    'PUT',
    development ? SERVERS.development : SERVERS.production,
    '/notifications/channels/${pathParams.id}',
    options,
  );
}
