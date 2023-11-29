import { request, RequestOptions, AuthOptions } from "../request"
import { SERVERS } from "../servers"

export type EmailsVerifyEmailResponse = {
  status: string
  error: string | null
  data: {
    emailAddress: {
      id: string
      userId: string | null
      email: string
      verifiedAt: string | null
      createdAt: string
      updatedAt: string
    }
  } | null
}

export type EmailsVerifyEmailInput = {
  code: string
}

export function verifyEmail(
  auth: AuthOptions,
  body?: EmailsVerifyEmailInput,
  options?: RequestOptions<EmailsVerifyEmailInput>,
  development?: boolean
): Promise<EmailsVerifyEmailResponse> {
  const isDevelopment =
    development ?? process.env.PROTOCOL_ENV === "development" ?? false
  return request<EmailsVerifyEmailInput, EmailsVerifyEmailResponse>(
    auth,
    "POST",
    isDevelopment ? SERVERS.development : SERVERS.production,
    "/user/emails/${pathParams.emailId}/verify",
    { ...options, body }
  )
}
