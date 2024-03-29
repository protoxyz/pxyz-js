import { request, RequestOptions, AuthOptions } from "../request"
import { SERVERS } from "../servers"

export type WellKnownOpenidConfigurationResponse = {
  status: string
  error?: string | null
  data?: {
    issuer: string
    authorization_endpoint: string
    token_endpoint: string
    userinfo_endpoint: string
    mfa_challenge_endpoint: string
    mfa_challenge_verify_endpoint: string
    mfa_challenge_resend_endpoint: string
    mfa_challenge_cancel_endpoint: string
    jwks_uri: string
    registration_endpoint: string
    scopes_supported: string[]
    response_types_supported: string[]
    code_challenge_methods_supported: string[]
    response_modes_supported: string[]
    subject_types_supported: string[]
    id_token_signing_alg_values_supported: string[]
    token_endpoint_auth_methods_supported: string[]
    claims_supported: string[]
    request_uri_parameter_supported: boolean
  } | null
}

export type WellKnownOpenidConfigurationInput = undefined

export function openidConfiguration(
  body?: WellKnownOpenidConfigurationInput,
  options?: RequestOptions<WellKnownOpenidConfigurationInput>,
  development?: boolean
): Promise<WellKnownOpenidConfigurationResponse> {
  const isDevelopment =
    development ?? process.env.PROTOCOL_ENV === "development" ?? false
  return request<
    WellKnownOpenidConfigurationInput,
    WellKnownOpenidConfigurationResponse
  >(
    undefined,
    "GET",
    isDevelopment ? SERVERS.development : SERVERS.production,
    "/.well-known/openid-configuration/${pathParams.domain}",
    { ...options, body }
  )
}
