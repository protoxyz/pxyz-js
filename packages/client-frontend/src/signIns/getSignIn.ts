import { request, RequestOptions, AuthOptions } from "../request"
import { SERVERS } from "../servers"

export type SignInsGetSignInResponse = {
  status: string
  error: string | null
  data: {
    signInAttempt: {
      id: string
      userId: string | null
      tenantId: string
      identifier: string | null
      status: string
      strategy: string | null
      oauthProviderId: string | null
      oauthProvider: {
        id: string
        providerKey: string
      } | null
      ipAddress: string | null
      userAgent: string | null
      redirectUri: string | null
      createdAt: string
      updatedAt: string
    } | null
  }
}

export type SignInsGetSignInInput = undefined

export function getSignIn(
  body?: SignInsGetSignInInput,
  options?: RequestOptions<SignInsGetSignInInput>,
  development?: boolean
): Promise<SignInsGetSignInResponse> {
  const isDevelopment =
    development ?? process.env.PROTOCOL_ENV === "development" ?? false
  return request<SignInsGetSignInInput, SignInsGetSignInResponse>(
    undefined,
    "GET",
    isDevelopment ? SERVERS.development : SERVERS.production,
    "/sign-ins/${pathParams.id}",
    { ...options, body }
  )
}
