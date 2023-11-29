import { request, RequestOptions, AuthOptions } from "../request"
import { SERVERS } from "../servers"

export type ConnectionsListConnectionsResponse = {
  status: string
  error?: string | null
  data: {
    id: string
    status: string
    socialProviderId: string
    socialProvider?: {
      providerKey: string
    } | null
    providerId?: string | null
    scope?: string | null
    createdAt: string
    updatedAt: string
  }[]
  meta: {
    total: number
    count: number
    numPages: number
    perPage: number
    prev?: string | null
    next?: string | null
  }
}

export type ConnectionsListConnectionsInput = undefined

export function listConnections(
  auth: AuthOptions,
  body?: ConnectionsListConnectionsInput,
  options?: RequestOptions<ConnectionsListConnectionsInput>,
  development?: boolean
): Promise<ConnectionsListConnectionsResponse> {
  const isDevelopment =
    development ?? process.env.PROTOCOL_ENV === "development" ?? false
  return request<
    ConnectionsListConnectionsInput,
    ConnectionsListConnectionsResponse
  >(
    auth,
    "GET",
    isDevelopment ? SERVERS.development : SERVERS.production,
    "/user/connections",
    { ...options, body }
  )
}
