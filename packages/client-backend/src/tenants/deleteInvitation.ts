import { request, RequestOptions, AuthOptions } from "../request";
import { SERVERS } from "../servers";

export type TenantsDeleteInvitationResponse = boolean

export type TenantsDeleteInvitationInput = undefined;

export function deleteInvitation(
    auth: AuthOptions,
    body?: TenantsDeleteInvitationInput,
    options?: RequestOptions<TenantsDeleteInvitationInput>,
    development?: boolean,
): Promise<TenantsDeleteInvitationResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
    return request<TenantsDeleteInvitationInput, TenantsDeleteInvitationResponse>(
        auth,
        'DELETE',
        isDevelopment ? SERVERS.development : SERVERS.production,
        '/tenants/invitations/${pathParams.id}',
        {...options, body},
    );
}
