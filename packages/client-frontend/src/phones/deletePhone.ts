import { request, RequestOptions, AuthOptions } from "../request"
import { SERVERS } from "../servers"

export type PhonesDeletePhoneResponse = {
  status: string
  error: string | null
}

export type PhonesDeletePhoneInput = undefined

export function deletePhone(
  auth: AuthOptions,
  body?: PhonesDeletePhoneInput,
  options?: RequestOptions<PhonesDeletePhoneInput>,
  development?: boolean
): Promise<PhonesDeletePhoneResponse> {
  const isDevelopment =
    development ?? process.env.PROTOCOL_ENV === "development" ?? false
  return request<PhonesDeletePhoneInput, PhonesDeletePhoneResponse>(
    auth,
    "DELETE",
    isDevelopment ? SERVERS.development : SERVERS.production,
    "/user/phones/${pathParams.phoneId}",
    { ...options, body }
  )
}
