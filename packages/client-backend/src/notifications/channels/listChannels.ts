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

export function listChannels(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<NotificationsChannelsListChannelsResponse> {
    return request<NotificationsChannelsListChannelsResponse>(
        auth,
        'GET',
        development ? SERVERS.development : SERVERS.production,
        '/tenants/${pathParams.tenantId}/notifications/channels',
        options,
    );
}

