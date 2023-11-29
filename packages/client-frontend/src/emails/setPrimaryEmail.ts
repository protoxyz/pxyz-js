import { request, RequestOptions, AuthOptions } from "../request"
import { SERVERS } from "../servers"

export type EmailsSetPrimaryEmailResponse = {
  status: string
  error?: string | null
  data?: {
    emailAddress: {
      id: string
      userId?: string | null
      email: string
      verifiedAt?: string | null
      createdAt: string
      updatedAt: string
    }
  } | null
}

export type EmailsSetPrimaryEmailInput = undefined

export function setPrimaryEmail(
  auth: AuthOptions,
  body?: EmailsSetPrimaryEmailInput,
  options?: RequestOptions<EmailsSetPrimaryEmailInput>,
  development?: boolean
): Promise<EmailsSetPrimaryEmailResponse> {
  const isDevelopment =
    development ?? process.env.PROTOCOL_ENV === "development" ?? false
  return request<EmailsSetPrimaryEmailInput, EmailsSetPrimaryEmailResponse>(
    auth,
    "POST",
    isDevelopment ? SERVERS.development : SERVERS.production,
    "/user/emails/${pathParams.emailId}/primary",
    { ...options, body }
  )
}
