import { request, RequestOptions, AuthOptions } from "../request"
import { SERVERS } from "../servers"

export type OrganizationMembersCreateOrganizationMemberResponse = {
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

export type OrganizationMembersCreateOrganizationMemberInput = {
  userId: string
  roleId: string
  publicMeta: Record<any, any>
  privateMeta: Record<any, any>
}

export function createOrganizationMember(
  auth: AuthOptions,
  body?: OrganizationMembersCreateOrganizationMemberInput,
  options?: RequestOptions<OrganizationMembersCreateOrganizationMemberInput>,
  development?: boolean
): Promise<OrganizationMembersCreateOrganizationMemberResponse> {
  const isDevelopment =
    development ?? process.env.PROTOCOL_ENV === "development" ?? false
  return request<
    OrganizationMembersCreateOrganizationMemberInput,
    OrganizationMembersCreateOrganizationMemberResponse
  >(
    auth,
    "POST",
    isDevelopment ? SERVERS.development : SERVERS.production,
    "/user/organizations/${pathParams.orgId}/members",
    { ...options, body }
  )
}
