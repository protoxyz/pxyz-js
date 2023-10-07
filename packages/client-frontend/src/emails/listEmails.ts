import { request, RequestOptions, AuthOptions } from "../request";
import { SERVERS } from "../servers";

export type EmailsListEmailsResponse = {
    status: string  
    error: string | null 
    data: {
    id: string  
    userId: string | null 
    email: string  
    verifiedAt: string | null 
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

export function listEmails(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<EmailsListEmailsResponse> {
    return request<EmailsListEmailsResponse>(
        auth,
        'GET',
        development ? SERVERS.development : SERVERS.production,
        '/user/emails',
        options,
    );
}
