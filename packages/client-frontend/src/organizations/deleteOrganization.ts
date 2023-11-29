import { request, RequestOptions, AuthOptions } from "../request"
import { SERVERS } from "../servers"

export type OrganizationsDeleteOrganizationResponse = {
  status: string
  error?: string | null
  data?: any | null
}

export type OrganizationsDeleteOrganizationInput = undefined

export function deleteOrganization(
  auth: AuthOptions,
  body?: OrganizationsDeleteOrganizationInput,
  options?: RequestOptions<OrganizationsDeleteOrganizationInput>,
  development?: boolean
): Promise<OrganizationsDeleteOrganizationResponse> {
  const isDevelopment =
    development ?? process.env.PROTOCOL_ENV === "development" ?? false
  return request<
    OrganizationsDeleteOrganizationInput,
    OrganizationsDeleteOrganizationResponse
  >(
    auth,
    "DELETE",
    isDevelopment ? SERVERS.development : SERVERS.production,
    "/user/organizations/${pathParams.orgId}",
    { ...options, body }
  )
}
