import { request, RequestOptions, AuthOptions } from "../request"
import { SERVERS } from "../servers"

export type SessionsListSessionsResponse = {
  status: string
  error?: string | null
  data?:
    | {
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
      }[]
    | null
  meta: {
    total: number
    count: number
    numPages: number
    perPage: number
    prev?: string | null
    next?: string | null
  }
}

export type SessionsListSessionsInput = undefined

export function listSessions(
  auth: AuthOptions,
  body?: SessionsListSessionsInput,
  options?: RequestOptions<SessionsListSessionsInput>,
  development?: boolean
): Promise<SessionsListSessionsResponse> {
  const isDevelopment =
    development ?? process.env.PROTOCOL_ENV === "development" ?? false
  return request<SessionsListSessionsInput, SessionsListSessionsResponse>(
    auth,
    "GET",
    isDevelopment ? SERVERS.development : SERVERS.production,
    "/user/sessions",
    { ...options, body }
  )
}
