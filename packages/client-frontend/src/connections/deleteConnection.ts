import { request, RequestOptions, AuthOptions } from "../request"
import { SERVERS } from "../servers"

export type ConnectionsDeleteConnectionResponse = {
  status: string
  error?: string | null
  data?: {
    connection: {
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
    }
  } | null
}

export type ConnectionsDeleteConnectionInput = undefined

export function deleteConnection(
  auth: AuthOptions,
  body?: ConnectionsDeleteConnectionInput,
  options?: RequestOptions<ConnectionsDeleteConnectionInput>,
  development?: boolean
): Promise<ConnectionsDeleteConnectionResponse> {
  const isDevelopment =
    development ?? process.env.PROTOCOL_ENV === "development" ?? false
  return request<
    ConnectionsDeleteConnectionInput,
    ConnectionsDeleteConnectionResponse
  >(
    auth,
    "DELETE",
    isDevelopment ? SERVERS.development : SERVERS.production,
    "/user/connections/${pathParams.id}",
    { ...options, body }
  )
}
