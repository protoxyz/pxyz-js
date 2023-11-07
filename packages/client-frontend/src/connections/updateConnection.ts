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

export type ConnectionsUpdateConnectionInput = {
    code: string | null 
    profile: Record<any, any>  
    rawProfile: Record<any, any>  
    tokens: Record<any, any>  
};

export function updateConnection(
    auth: AuthOptions,
    body?: ConnectionsUpdateConnectionInput,
    options?: RequestOptions<ConnectionsUpdateConnectionInput>,
    development?: boolean,
): Promise<ConnectionsUpdateConnectionResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
    return request<ConnectionsUpdateConnectionInput, ConnectionsUpdateConnectionResponse>(
        auth,
        'PATCH',
        isDevelopment ? SERVERS.development : SERVERS.production,
        '/user/connections/${pathParams.id}',
        {...options, body},
    );
}
