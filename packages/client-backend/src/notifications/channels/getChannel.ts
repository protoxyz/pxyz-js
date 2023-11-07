import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type NotificationsChannelsGetChannelResponse = {
    id: string  
    tenantId: string  
    name: string  
    key: string  
    description: string | null 
    type: string  
    provider: string  
    enabled: boolean  
    providerSettings: Record<any, any>  
    createdAt: string  
    updatedAt: string  
}
export type NotificationsChannelsGetChannelInput = undefined;
export function getChannel(
    auth: AuthOptions,
    body?: NotificationsChannelsGetChannelInput,
    options?: RequestOptions<NotificationsChannelsGetChannelInput>,
    development?: boolean,
): Promise<NotificationsChannelsGetChannelResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<NotificationsChannelsGetChannelInput, NotificationsChannelsGetChannelResponse>(
      auth,
      'GET',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/notifications/channels/${pathParams.id}',
      options,
  );
}

