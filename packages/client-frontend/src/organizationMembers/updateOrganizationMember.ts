import { request, RequestOptions, AuthOptions } from "../request"
import { SERVERS } from "../servers"

export type OrganizationMembersUpdateOrganizationMemberResponse = {
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

export type OrganizationMembersUpdateOrganizationMemberInput = {
  roleId: string
  publicMeta: Record<any, any>
  privateMeta: Record<any, any>
}

export function updateOrganizationMember(
  auth: AuthOptions,
  body?: OrganizationMembersUpdateOrganizationMemberInput,
  options?: RequestOptions<OrganizationMembersUpdateOrganizationMemberInput>,
  development?: boolean
): Promise<OrganizationMembersUpdateOrganizationMemberResponse> {
  const isDevelopment =
    development ?? process.env.PROTOCOL_ENV === "development" ?? false
  return request<
    OrganizationMembersUpdateOrganizationMemberInput,
    OrganizationMembersUpdateOrganizationMemberResponse
  >(
    auth,
    "PATCH",
    isDevelopment ? SERVERS.development : SERVERS.production,
    "/user/organizations/${pathParams.orgId}/members/${pathParams.memberId}",
    { ...options, body }
  )
}
