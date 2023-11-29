import { request, RequestOptions, AuthOptions } from "../request"
import { SERVERS } from "../servers"

export type OrganizationsCreateOrganizationResponse = {
  status: string
  error?: string | null
  data: {
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
  }
}

export type OrganizationsCreateOrganizationInput = {
  name: string
  slug: string
  description?: string | null
}

export function createOrganization(
  auth: AuthOptions,
  body?: OrganizationsCreateOrganizationInput,
  options?: RequestOptions<OrganizationsCreateOrganizationInput>,
  development?: boolean
): Promise<OrganizationsCreateOrganizationResponse> {
  const isDevelopment =
    development ?? process.env.PROTOCOL_ENV === "development" ?? false
  return request<
    OrganizationsCreateOrganizationInput,
    OrganizationsCreateOrganizationResponse
  >(
    auth,
    "POST",
    isDevelopment ? SERVERS.development : SERVERS.production,
    "/user/organizations",
    { ...options, body }
  )
}
