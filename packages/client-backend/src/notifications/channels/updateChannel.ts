import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type NotificationsChannelsUpdateChannelResponse = {
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
export type NotificationsChannelsUpdateChannelInput = {
    name: string  
    key: string  
    description: string | null 
    type: string  
    provider: string  
    providerSettings: Record<any, any>  
};
export function updateChannel(
    auth: AuthOptions,
    body?: NotificationsChannelsUpdateChannelInput,
    options?: RequestOptions<NotificationsChannelsUpdateChannelInput>,
    development?: boolean,
): Promise<NotificationsChannelsUpdateChannelResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<NotificationsChannelsUpdateChannelInput, NotificationsChannelsUpdateChannelResponse>(
      auth,
      'PUT',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/notifications/channels/${pathParams.id}',
      options,
  );
}

