import { request, RequestOptions, AuthOptions } from "../request"
import { SERVERS } from "../servers"

export type OrganizationMembersListOrganizationMembersResponse = {
  status: string
  error: string | null
  data:
    | {
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
      }[]
    | null
  meta: {
    total: number
    count: number
    numPages: number
    perPage: number
    prev: string | null
    next: string | null
  } | null
}

export type OrganizationMembersListOrganizationMembersInput = undefined

export function listOrganizationMembers(
  auth: AuthOptions,
  body?: OrganizationMembersListOrganizationMembersInput,
  options?: RequestOptions<OrganizationMembersListOrganizationMembersInput>,
  development?: boolean
): Promise<OrganizationMembersListOrganizationMembersResponse> {
  const isDevelopment =
    development ?? process.env.PROTOCOL_ENV === "development" ?? false
  return request<
    OrganizationMembersListOrganizationMembersInput,
    OrganizationMembersListOrganizationMembersResponse
  >(
    auth,
    "GET",
    isDevelopment ? SERVERS.development : SERVERS.production,
    "/user/organizations/${pathParams.orgId}/members",
    { ...options, body }
  )
}
