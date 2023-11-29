import { request, RequestOptions, AuthOptions } from "../request"
import { SERVERS } from "../servers"

export type OrganizationInvitationsListOrganizationInvitationsResponse = {
  status: string
  error: string | null
  data: {
    id: string
    organizationId: string
    email: string | null
    phone: string | null
    userId: string | null
    roleId: string
    acceptedAt: string | null
    declinedAt: string | null
    createdAt: string
    updatedAt: string
  }[]
  meta: {
    total: number
    count: number
    numPages: number
    perPage: number
    prev: string | null
    next: string | null
  }
}

export type OrganizationInvitationsListOrganizationInvitationsInput = undefined

export function listOrganizationInvitations(
  auth: AuthOptions,
  body?: OrganizationInvitationsListOrganizationInvitationsInput,
  options?: RequestOptions<OrganizationInvitationsListOrganizationInvitationsInput>,
  development?: boolean
): Promise<OrganizationInvitationsListOrganizationInvitationsResponse> {
  const isDevelopment =
    development ?? process.env.PROTOCOL_ENV === "development" ?? false
  return request<
    OrganizationInvitationsListOrganizationInvitationsInput,
    OrganizationInvitationsListOrganizationInvitationsResponse
  >(
    auth,
    "GET",
    isDevelopment ? SERVERS.development : SERVERS.production,
    "/organizations/${pathParams.organizationId}/invitations",
    { ...options, body }
  )
}
