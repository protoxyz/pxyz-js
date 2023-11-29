import { request, RequestOptions, AuthOptions } from "../request"
import { SERVERS } from "../servers"

export type EmailsCreateEmailResponse = {
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

export type EmailsCreateEmailInput = {
  email: string
}

export function createEmail(
  auth: AuthOptions,
  body?: EmailsCreateEmailInput,
  options?: RequestOptions<EmailsCreateEmailInput>,
  development?: boolean
): Promise<EmailsCreateEmailResponse> {
  const isDevelopment =
    development ?? process.env.PROTOCOL_ENV === "development" ?? false
  return request<EmailsCreateEmailInput, EmailsCreateEmailResponse>(
    auth,
    "POST",
    isDevelopment ? SERVERS.development : SERVERS.production,
    "/user/emails",
    { ...options, body }
  )
}
