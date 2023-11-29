import { request, RequestOptions, AuthOptions } from "../request"
import { SERVERS } from "../servers"

export type ConnectionsCreateConnectionResponse = {
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

export type ConnectionsCreateConnectionInput = {
  providerKey: string
}

export function createConnection(
  auth: AuthOptions,
  body?: ConnectionsCreateConnectionInput,
  options?: RequestOptions<ConnectionsCreateConnectionInput>,
  development?: boolean
): Promise<ConnectionsCreateConnectionResponse> {
  const isDevelopment =
    development ?? process.env.PROTOCOL_ENV === "development" ?? false
  return request<
    ConnectionsCreateConnectionInput,
    ConnectionsCreateConnectionResponse
  >(
    auth,
    "POST",
    isDevelopment ? SERVERS.development : SERVERS.production,
    "/user/connections",
    { ...options, body }
  )
}
