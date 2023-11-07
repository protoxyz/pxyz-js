import { request, RequestOptions, AuthOptions } from "../request";
import { SERVERS } from "../servers";

export type TenantsDeleteMemberResponse = boolean

export type TenantsDeleteMemberInput = undefined;

export function deleteMember(
    auth: AuthOptions,
    body?: TenantsDeleteMemberInput,
    options?: RequestOptions<TenantsDeleteMemberInput>,
    development?: boolean,
): Promise<TenantsDeleteMemberResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
    return request<TenantsDeleteMemberInput, TenantsDeleteMemberResponse>(
        auth,
        'DELETE',
        isDevelopment ? SERVERS.development : SERVERS.production,
        '/tenants/members/${pathParams.id}',
        {...options, body},
    );
}
