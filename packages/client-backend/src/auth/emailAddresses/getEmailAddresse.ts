import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthEmailAddressesGetEmailAddresseResponse = {
    id: string  
    tenantId: string  
    userId: string | null 
    email: string  
    verifiedAt: string | null 
    createdAt: string  
    updatedAt: string  
}

export function getEmailAddresse(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<AuthEmailAddressesGetEmailAddresseResponse> {
    return request<AuthEmailAddressesGetEmailAddresseResponse>(
        auth,
        'GET',
        development ? SERVERS.development : SERVERS.production,
        '/auth/email-addresses/${pathParams.id}',
        options,
    );
}

