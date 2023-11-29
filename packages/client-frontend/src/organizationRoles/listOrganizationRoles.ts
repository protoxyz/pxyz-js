import { request, RequestOptions, AuthOptions } from "../request"
import { SERVERS } from "../servers"

export type OrganizationRolesListOrganizationRolesResponse = {
  status: string
  error?: string | null
  data?:
    | {
        id: string
        name: string
        description?: string | null
        permissions: string[]
        createdAt: string
        updatedAt: string
      }[]
    | null
  meta?: {
    total: number
    count: number
    numPages: number
    perPage: number
    prev?: string | null
    next?: string | null
  } | null
}

export type OrganizationRolesListOrganizationRolesInput = undefined

export function listOrganizationRoles(
  auth: AuthOptions,
  body?: OrganizationRolesListOrganizationRolesInput,
  options?: RequestOptions<OrganizationRolesListOrganizationRolesInput>,
  development?: boolean
): Promise<OrganizationRolesListOrganizationRolesResponse> {
  const isDevelopment =
    development ?? process.env.PROTOCOL_ENV === "development" ?? false
  return request<
    OrganizationRolesListOrganizationRolesInput,
    OrganizationRolesListOrganizationRolesResponse
  >(
    auth,
    "GET",
    isDevelopment ? SERVERS.development : SERVERS.production,
    "/organizations/${pathParams.organizationId}/roles",
    { ...options, body }
  )
}
