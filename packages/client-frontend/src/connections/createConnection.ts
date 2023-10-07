import { request, RequestOptions, AuthOptions } from "../request";
import { SERVERS } from "../servers";

export type ConnectionsCreateConnectionResponse = {
    status: string  
    error: string | null 
    data: {
    connection: {
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
}  
} | null 
}

export function createConnection(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<ConnectionsCreateConnectionResponse> {
    return request<ConnectionsCreateConnectionResponse>(
        auth,
        'POST',
        development ? SERVERS.development : SERVERS.production,
        '/user/connections',
        options,
    );
}
