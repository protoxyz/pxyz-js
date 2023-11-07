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

export type EmailsListEmailsInput = undefined;

export function listEmails(
    auth: AuthOptions,
    body?: EmailsListEmailsInput,
    options?: RequestOptions<EmailsListEmailsInput>,
    development?: boolean,
): Promise<EmailsListEmailsResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
    return request<EmailsListEmailsInput, EmailsListEmailsResponse>(
        auth,
        'GET',
        isDevelopment ? SERVERS.development : SERVERS.production,
        '/user/emails',
        {...options, body},
    );
}
