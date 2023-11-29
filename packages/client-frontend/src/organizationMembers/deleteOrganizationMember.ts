import { request, RequestOptions, AuthOptions } from "../request"
import { SERVERS } from "../servers"

export type OrganizationMembersDeleteOrganizationMemberResponse = {
  status: string
  error: string | null
  data: {
    id: string
    organizationId: string
    userId: string
    roleId: string | null
    role: {
      id: string
      name: string
      description: string | null
      permissions: string[] | null
    } | null
    user: {
      id: string
      name: string
      identifier: string
      imageUri: string | null
      createdAt: string
      updatedAt: string
    }
    publicMeta: Record<any, any>
    privateMeta: Record<any, any>
    createdAt: string
    updatedAt: string
  } | null
}

export type OrganizationMembersDeleteOrganizationMemberInput = undefined

export function deleteOrganizationMember(
  auth: AuthOptions,
  body?: OrganizationMembersDeleteOrganizationMemberInput,
  options?: RequestOptions<OrganizationMembersDeleteOrganizationMemberInput>,
  development?: boolean
): Promise<OrganizationMembersDeleteOrganizationMemberResponse> {
  const isDevelopment =
    development ?? process.env.PROTOCOL_ENV === "development" ?? false
  return request<
    OrganizationMembersDeleteOrganizationMemberInput,
    OrganizationMembersDeleteOrganizationMemberResponse
  >(
    auth,
    "DELETE",
    isDevelopment ? SERVERS.development : SERVERS.production,
    "/user/organizations/${pathParams.orgId}/members/${pathParams.memberId}",
    { ...options, body }
  )
}
