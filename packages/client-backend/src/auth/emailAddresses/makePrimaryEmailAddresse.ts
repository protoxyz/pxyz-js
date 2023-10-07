import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthEmailAddressesMakePrimaryEmailAddresseResponse = {
    id: string  
    tenantId: string  
    userId: string | null 
    email: string  
    verifiedAt: string | null 
    createdAt: string  
    updatedAt: string  
}

export function makePrimaryEmailAddresse(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<AuthEmailAddressesMakePrimaryEmailAddresseResponse> {
    return request<AuthEmailAddressesMakePrimaryEmailAddresseResponse>(
        auth,
        'POST',
        development ? SERVERS.development : SERVERS.production,
        '/auth/email-addresses/make-primary',
        options,
    );
}

