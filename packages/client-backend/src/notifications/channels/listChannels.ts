import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type NotificationsChannelsListChannelsResponse = {
    status: string  
    data: {
    id: string  
    tenantId: string  
    name: string  
    key: string  
    description: string | null 
    type: string  
    provider: string  
    enabled: boolean  
    createdAt: string  
    updatedAt: string  
}[]  
    meta: {
    total: number  
    count: number  
    numPages: number  
    perPage: number  
    prev: string | null 
    next: string | null 
}  
}
export type NotificationsChannelsListChannelsInput = undefined;
export function listChannels(
    auth: AuthOptions,
    body?: NotificationsChannelsListChannelsInput,
    options?: RequestOptions<NotificationsChannelsListChannelsInput>,
    development?: boolean,
): Promise<NotificationsChannelsListChannelsResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<NotificationsChannelsListChannelsInput, NotificationsChannelsListChannelsResponse>(
      auth,
      'GET',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/tenants/${pathParams.tenantId}/notifications/channels',
      options,
  );
}

