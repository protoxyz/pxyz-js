import { request, RequestOptions, AuthOptions } from "../request";
import { SERVERS } from "../servers";

export type ConnectionsListConnectionsResponse = {
    status: string  
    error: string | null 
    data: {
    id: string  
    status: string  
    socialProviderId: string  
    socialProvider: {
    providerKey: string  
} | null 
    providerId: string | null 
    scope: string | null 
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
