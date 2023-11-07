import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type NotificationsChannelsDeleteChannelResponse = {
    deleted: boolean  
}
export type NotificationsChannelsDeleteChannelInput = undefined;
export function deleteChannel(
    auth: AuthOptions,
    body?: NotificationsChannelsDeleteChannelInput,
    options?: RequestOptions<NotificationsChannelsDeleteChannelInput>,
    development?: boolean,
): Promise<NotificationsChannelsDeleteChannelResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<NotificationsChannelsDeleteChannelInput, NotificationsChannelsDeleteChannelResponse>(
      auth,
      'DELETE',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/notifications/channels/${pathParams.id}',
      options,
  );
}

