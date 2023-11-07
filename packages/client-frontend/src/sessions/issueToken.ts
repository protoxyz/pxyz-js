import { request, RequestOptions, AuthOptions } from "../request";
import { SERVERS } from "../servers";

export type SessionsIssueTokenResponse = {
    status: string  
    error: string | null 
    data: {
    jwt: string | null 
    sessionUser: any | null 
} | null 
}

export type SessionsIssueTokenInput = {
    orgId: string | null 
    ttl: number  
};

export function issueToken(
    auth: AuthOptions,
    body?: SessionsIssueTokenInput,
    options?: RequestOptions<SessionsIssueTokenInput>,
    development?: boolean,
): Promise<SessionsIssueTokenResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
    return request<SessionsIssueTokenInput, SessionsIssueTokenResponse>(
        auth,
        'POST',
        isDevelopment ? SERVERS.development : SERVERS.production,
        '/user/sessions/token',
        {...options, body},
    );
}
