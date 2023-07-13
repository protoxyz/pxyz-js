import { Protocol } from '../../pxyz';
import {
  GetWellKnownJWKSOptions,
  GetWellKnownOpenIDConfigurationOptions,
} from '../../requests';
import {
  GetWellKnownJWKS200Response,
  GetWellKnownOpenIDConfiguration200Response,
} from '../../responses';

export const GetWellKnownJWKSPath =
  '/api/auth/frontend/v0/.well-known/jwks/{domain}';
export const GetWellKnownOpenIDConfigurationPath =
  '/api/auth/frontend/v0/.well-known/openid-configuration/{domain}';

export class ProtocolAuthWellKnownsService {
  private protocol: Protocol;

  constructor(protocol: Protocol) {
    this.protocol = protocol;
  }

  jwks(
    options?: GetWellKnownJWKSOptions,
  ): Promise<GetWellKnownJWKS200Response> {
    return this.protocol.client.request<GetWellKnownJWKS200Response>(
      'GET',
      GetWellKnownJWKSPath,
      options,
    );
  }

  openidConfiguration(
    options?: GetWellKnownOpenIDConfigurationOptions,
  ): Promise<GetWellKnownOpenIDConfiguration200Response> {
    return this.protocol.client.request<GetWellKnownOpenIDConfiguration200Response>(
      'GET',
      GetWellKnownOpenIDConfigurationPath,
      options,
    );
  }
}
