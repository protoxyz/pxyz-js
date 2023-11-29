import { request, RequestOptions, AuthOptions } from "../request"
import { SERVERS } from "../servers"

export type OrganizationsUpdateOrganizationResponse = {
  status: string
  error?: string | null
  data?: {
    organization?: {
      id: string
      name: string
      slug: string
      description?: string | null
      logoUri?: string | null
      iconUri?: string | null
      createdAt: string | string
      updatedAt: string | string
    } | null
  } | null
}

export type OrganizationsUpdateOrganizationInput = {
  name: string
  slug: string
  description?: string | null
}

export function updateOrganization(
  auth: AuthOptions,
  body?: OrganizationsUpdateOrganizationInput,
  options?: RequestOptions<OrganizationsUpdateOrganizationInput>,
  development?: boolean
): Promise<OrganizationsUpdateOrganizationResponse> {
  const isDevelopment =
    development ?? process.env.PROTOCOL_ENV === "development" ?? false
  return request<
    OrganizationsUpdateOrganizationInput,
    OrganizationsUpdateOrganizationResponse
  >(
    auth,
    "PUT",
    isDevelopment ? SERVERS.development : SERVERS.production,
    "/user/organizations/${pathParams.organizationId}",
    { ...options, body }
  )
}
