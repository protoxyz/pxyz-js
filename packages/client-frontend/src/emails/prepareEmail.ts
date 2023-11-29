import { request, RequestOptions, AuthOptions } from "../request"
import { SERVERS } from "../servers"

export type EmailsPrepareEmailResponse = {
  status: string
  error: string | null
}

export type EmailsPrepareEmailInput = undefined

export function prepareEmail(
  auth: AuthOptions,
  body?: EmailsPrepareEmailInput,
  options?: RequestOptions<EmailsPrepareEmailInput>,
  development?: boolean
): Promise<EmailsPrepareEmailResponse> {
  const isDevelopment =
    development ?? process.env.PROTOCOL_ENV === "development" ?? false
  return request<EmailsPrepareEmailInput, EmailsPrepareEmailResponse>(
    auth,
    "POST",
    isDevelopment ? SERVERS.development : SERVERS.production,
    "/user/emails/${pathParams.emailId}/prepare",
    { ...options, body }
  )
}
