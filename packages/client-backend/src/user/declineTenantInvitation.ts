import { request, RequestOptions, AuthOptions } from "../request";
import { SERVERS } from "../servers";

export type UserDeclineTenantInvitationResponse = {
    status: string  
}

export type UserDeclineTenantInvitationInput = undefined;

export function declineTenantInvitation(
    auth: AuthOptions,
    body?: UserDeclineTenantInvitationInput,
    options?: RequestOptions<UserDeclineTenantInvitationInput>,
    development?: boolean,
): Promise<UserDeclineTenantInvitationResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
    return request<UserDeclineTenantInvitationInput, UserDeclineTenantInvitationResponse>(
        auth,
        'POST',
        isDevelopment ? SERVERS.development : SERVERS.production,
        '/user/invitations/${pathParams.id}/decline',
        {...options, body},
    );
}
