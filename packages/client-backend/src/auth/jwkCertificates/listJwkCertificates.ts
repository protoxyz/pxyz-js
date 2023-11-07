import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthJwkCertificatesListJwkCertificatesResponse = {
    id: string  
    tenantId: string  
    public: string  
    createdAt: string  
    updatedAt: string  
}[]
export type AuthJwkCertificatesListJwkCertificatesInput = undefined;
export function listJwkCertificates(
    auth: AuthOptions,
    body?: AuthJwkCertificatesListJwkCertificatesInput,
    options?: RequestOptions<AuthJwkCertificatesListJwkCertificatesInput>,
    development?: boolean,
): Promise<AuthJwkCertificatesListJwkCertificatesResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<AuthJwkCertificatesListJwkCertificatesInput, AuthJwkCertificatesListJwkCertificatesResponse>(
      auth,
      'GET',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/auth/jwk-certificates',
      options,
  );
}

