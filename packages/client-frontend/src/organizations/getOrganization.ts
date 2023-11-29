import { request, RequestOptions, AuthOptions } from "../request"
import { SERVERS } from "../servers"

export type OrganizationsGetOrganizationResponse = {
  status: string
  error: string | null
  data: {
    organization: {
      id: string
      name: string
      slug: string
      description: string | null
      logoUri: string | null
      iconUri: string | null
      createdAt: string | string
      updatedAt: string | string
    } | null
  } | null
}

export type OrganizationsGetOrganizationInput = undefined

export function getOrganization(
  auth: AuthOptions,
  body?: OrganizationsGetOrganizationInput,
  options?: RequestOptions<OrganizationsGetOrganizationInput>,
  development?: boolean
): Promise<OrganizationsGetOrganizationResponse> {
  const isDevelopment =
    development ?? process.env.PROTOCOL_ENV === "development" ?? false
  return request<
    OrganizationsGetOrganizationInput,
    OrganizationsGetOrganizationResponse
  >(
    auth,
    "GET",
    isDevelopment ? SERVERS.development : SERVERS.production,
    "/user/organizations/${pathParams.organizationId}",
    { ...options, body }
  )
}
