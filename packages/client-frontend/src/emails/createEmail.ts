import { request, RequestOptions, AuthOptions } from "../request";
import { SERVERS } from "../servers";

export type EmailsCreateEmailResponse = {
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

export function createEmail(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<EmailsCreateEmailResponse> {
    return request<EmailsCreateEmailResponse>(
        auth,
        'POST',
        development ? SERVERS.development : SERVERS.production,
        '/user/emails',
        options,
    );
}
