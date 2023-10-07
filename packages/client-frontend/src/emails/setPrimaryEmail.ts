import { request, RequestOptions, AuthOptions } from "../request";
import { SERVERS } from "../servers";

export type EmailsSetPrimaryEmailResponse = {
    status: string  
    error: string | null 
    data: {
    emailAddress: {
    id: string  
    userId: string | null 
    email: string  
    verifiedAt: string | null 
    createdAt: string  
    updatedAt: string  
}  
} | null 
}

export function setPrimaryEmail(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<EmailsSetPrimaryEmailResponse> {
    return request<EmailsSetPrimaryEmailResponse>(
        auth,
        'POST',
        development ? SERVERS.development : SERVERS.production,
        '/user/emails/${pathParams.emailId}/primary',
        options,
    );
}
