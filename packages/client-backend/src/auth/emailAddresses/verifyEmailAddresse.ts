import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthEmailAddressesVerifyEmailAddresseResponse = {
    id: string  
    tenantId: string  
    userId: string | null 
    email: string  
    verifiedAt: string | null 
    createdAt: string  
    updatedAt: string  
}

export function verifyEmailAddresse(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<AuthEmailAddressesVerifyEmailAddresseResponse> {
    return request<AuthEmailAddressesVerifyEmailAddresseResponse>(
        auth,
        'POST',
        development ? SERVERS.development : SERVERS.production,
        '/auth/email-addresses/verify',
        options,
    );
}
