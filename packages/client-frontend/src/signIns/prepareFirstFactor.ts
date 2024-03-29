import { request, RequestOptions, AuthOptions } from "../request"
import { SERVERS } from "../servers"

export type SignInsPrepareFirstFactorResponse = {
  status: string
  error?: string | null
  data?: {
    signInAttempt: {
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
    }
    session?: {
      id: string
      browser?: string | null
      device?: string | null
      engine?: string | null
      os?: string | null
      cpu?: string | null
      ua?: string | null
      ip?: string | null
      userId?: string | null
      signInAttemptId?: string | null
      signUpAttemptId?: string | null
      expiresAt: string
      createdAt: string
      updatedAt: string
    } | null
    sessionUser?: {
      sub: string
      exp: number
      aud: string
      iss: string
      claims?: {
        sessionId: string
        name?: string | null
        username?: string | null
        image?: string | null
        orgId?: string | null
        role?: string | null
        permissions?: string[] | null
        email?: string | null
        phone?: string | null
        orgRole?: string | null
        orgPermissions?: string[] | null
      } | null
    } | null
    jwt?: string | null
    authorizeUri?: string | null
  } | null
}

export type SignInsPrepareFirstFactorInput = {
  identifier: string
  strategy: string
  providerKey?: string | null
  redirectUri?: string | null
}

export function prepareFirstFactor(
  body?: SignInsPrepareFirstFactorInput,
  options?: RequestOptions<SignInsPrepareFirstFactorInput>,
  development?: boolean
): Promise<SignInsPrepareFirstFactorResponse> {
  const isDevelopment =
    development ?? process.env.PROTOCOL_ENV === "development" ?? false
  return request<
    SignInsPrepareFirstFactorInput,
    SignInsPrepareFirstFactorResponse
  >(
    undefined,
    "POST",
    isDevelopment ? SERVERS.development : SERVERS.production,
    "/sign-ins/${pathParams.id}/prepare-first-factor",
    { ...options, body }
  )
}
