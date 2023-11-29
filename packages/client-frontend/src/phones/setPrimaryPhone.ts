import { request, RequestOptions, AuthOptions } from "../request"
import { SERVERS } from "../servers"

export type PhonesSetPrimaryPhoneResponse = {
  status: string
  error?: string | null
  data?: {
    phoneNumber: {
      id: string
      userId?: string | null
      phone: string
      verifiedAt?: string | null
      createdAt: string
      updatedAt: string
    }
  } | null
}

export type PhonesSetPrimaryPhoneInput = undefined

export function setPrimaryPhone(
  auth: AuthOptions,
  body?: PhonesSetPrimaryPhoneInput,
  options?: RequestOptions<PhonesSetPrimaryPhoneInput>,
  development?: boolean
): Promise<PhonesSetPrimaryPhoneResponse> {
  const isDevelopment =
    development ?? process.env.PROTOCOL_ENV === "development" ?? false
  return request<PhonesSetPrimaryPhoneInput, PhonesSetPrimaryPhoneResponse>(
    auth,
    "POST",
    isDevelopment ? SERVERS.development : SERVERS.production,
    "/user/phones/${pathParams.phoneId}/primary",
    { ...options, body }
  )
}
