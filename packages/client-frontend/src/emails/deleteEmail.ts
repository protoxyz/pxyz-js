import { request, RequestOptions, AuthOptions } from "../request";
import { SERVERS } from "../servers";

export type EmailsDeleteEmailResponse = {
    status: string  
    error: string | null 
}

export type EmailsDeleteEmailInput = undefined;

export function deleteEmail(
    auth: AuthOptions,
    body?: EmailsDeleteEmailInput,
    options?: RequestOptions<EmailsDeleteEmailInput>,
    development?: boolean,
): Promise<EmailsDeleteEmailResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
    return request<EmailsDeleteEmailInput, EmailsDeleteEmailResponse>(
        auth,
        'DELETE',
        isDevelopment ? SERVERS.development : SERVERS.production,
        '/user/emails/${pathParams.emailId}',
        {...options, body},
    );
}
