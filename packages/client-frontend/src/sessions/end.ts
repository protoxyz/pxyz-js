import { request, RequestOptions, AuthOptions } from "../request"
import { SERVERS } from "../servers"

export type SessionsEndResponse = {
  status: string
  error?: string | null
  data?: {
    session?: {
      id: string
      browser?: string | null
      device?: string | null
      engine?: string | null
      os?: string | null
      cpu?: string | null
      ua?: string | null
      ip?: string | null
      userId: string
      user: Record<any, any>
      signInAttemptId?: string | null
      signInAttempt?: {
        id: string
        userId?: string | null
        tenantId: string
        identifier?: string | null
        status: string
        strategy?: string | null
        oauthProviderId?: string | null
        oauthProvider?: {
          id: string
          providerKey: string
        } | null
        ipAddress?: string | null
        userAgent?: string | null
        redirectUri?: string | null
        createdAt: string
        updatedAt: string
      } | null
      signUpAttemptId?: string | null
      signUpAttempt?: {
        id: string
        userId?: string | null
        tenantId?: string | null
        name?: string | null
        email?: string | null
        phone?: string | null
        username?: string | null
        status: string
        oauthProviderId?: string | null
        oauthProvider?: {
          id: string
          providerKey: string
        } | null
        redirectUri?: string | null
        emailVerificationStrategy?: string | null
        phoneVerificationStrategy?: string | null
        requiredFields: string[]
        missingFields: string[]
        requiredVerifications: string[]
        missingVerifications: string[]
        createdAt: string
        updatedAt: string
      } | null
      expiresAt: string
      createdAt: string
      updatedAt: string
    } | null
  } | null
}

export type SessionsEndInput = undefined

export function end(
  auth: AuthOptions,
  body?: SessionsEndInput,
  options?: RequestOptions<SessionsEndInput>,
  development?: boolean
): Promise<SessionsEndResponse> {
  const isDevelopment =
    development ?? process.env.PROTOCOL_ENV === "development" ?? false
  return request<SessionsEndInput, SessionsEndResponse>(
    auth,
    "DELETE",
    isDevelopment ? SERVERS.development : SERVERS.production,
    "/user/sessions/end",
    { ...options, body }
  )
}
