import { request, RequestOptions, AuthOptions } from "../request";
import { SERVERS } from "../servers";

export type UserAcceptTenantInvitationResponse = {
    status: string  
}

export type UserAcceptTenantInvitationInput = undefined;

export function acceptTenantInvitation(
    auth: AuthOptions,
    body?: UserAcceptTenantInvitationInput,
    options?: RequestOptions<UserAcceptTenantInvitationInput>,
    development?: boolean,
): Promise<UserAcceptTenantInvitationResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
    return request<UserAcceptTenantInvitationInput, UserAcceptTenantInvitationResponse>(
        auth,
        'POST',
        isDevelopment ? SERVERS.development : SERVERS.production,
        '/user/invitations/${pathParams.id}/accept',
        {...options, body},
    );
}
