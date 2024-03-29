import { request, RequestOptions, AuthOptions } from "../request"
import { SERVERS } from "../servers"

export type OrganizationMembersGetOrganizationMemberResponse = {
  status: string
  error?: string | null
  data?: {
    id: string
    organizationId: string
    userId: string
    roleId?: string | null
    role?: {
      id: string
      name: string
      description?: string | null
      permissions?: string[] | null
    } | null
    user: {
      id: string
      name: string
      identifier: string
      imageUri?: string | null
      createdAt: string
      updatedAt: string
    }
    publicMeta: Record<any, any>
    privateMeta: Record<any, any>
    createdAt: string
    updatedAt: string
  } | null
}

export type OrganizationMembersGetOrganizationMemberInput = undefined

export function getOrganizationMember(
  auth: AuthOptions,
  body?: OrganizationMembersGetOrganizationMemberInput,
  options?: RequestOptions<OrganizationMembersGetOrganizationMemberInput>,
  development?: boolean
): Promise<OrganizationMembersGetOrganizationMemberResponse> {
  const isDevelopment =
    development ?? process.env.PROTOCOL_ENV === "development" ?? false
  return request<
    OrganizationMembersGetOrganizationMemberInput,
    OrganizationMembersGetOrganizationMemberResponse
  >(
    auth,
    "GET",
    isDevelopment ? SERVERS.development : SERVERS.production,
    "/user/organizations/${pathParams.organizationId}/members/${pathParams.memberId}",
    { ...options, body }
  )
}
