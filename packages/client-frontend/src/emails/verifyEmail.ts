import { request, RequestOptions, AuthOptions } from "../request";
import { SERVERS } from "../servers";

export type EmailsVerifyEmailResponse = {
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

export function verifyEmail(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<EmailsVerifyEmailResponse> {
    return request<EmailsVerifyEmailResponse>(
        auth,
        'POST',
        development ? SERVERS.development : SERVERS.production,
        '/user/emails/${pathParams.emailId}/verify',
        options,
    );
}
