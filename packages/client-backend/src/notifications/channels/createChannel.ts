import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type NotificationsChannelsCreateChannelResponse = {
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
export type NotificationsChannelsCreateChannelInput = {
    tenantId: string  
    name: string  
    key: string  
    description: string | null 
    type: string  
    provider: string  
    providerSettings: Record<any, any>  
};
export function createChannel(
    auth: AuthOptions,
    body?: NotificationsChannelsCreateChannelInput,
    options?: RequestOptions<NotificationsChannelsCreateChannelInput>,
    development?: boolean,
): Promise<NotificationsChannelsCreateChannelResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<NotificationsChannelsCreateChannelInput, NotificationsChannelsCreateChannelResponse>(
      auth,
      'POST',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/notifications/channels',
      options,
  );
}

