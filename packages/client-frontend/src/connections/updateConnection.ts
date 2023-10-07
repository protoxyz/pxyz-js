import { request, RequestOptions, AuthOptions } from "../request";
import { SERVERS } from "../servers";

export type ConnectionsUpdateConnectionResponse = {
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

export function updateConnection(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<ConnectionsUpdateConnectionResponse> {
    return request<ConnectionsUpdateConnectionResponse>(
        auth,
        'PATCH',
        development ? SERVERS.development : SERVERS.production,
        '/user/connections/${pathParams.id}',
        options,
    );
}
