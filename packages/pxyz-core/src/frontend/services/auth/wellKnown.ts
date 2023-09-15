import {
  FrontendGetWellKnownJWKSPath,
  FrontendGetWellKnownOpenIDConfigurationPath,
} from '@/frontend/paths';
import { ProtocolFrontendClient } from '../../pxyz';
import {
  FrontendGetWellKnownJWKSOptions,
  FrontendGetWellKnownOpenIDConfigurationOptions,
} from '../../requests';
import {
  FrontendGetWellKnownJWKS200Response,
  FrontendGetWellKnownOpenIDConfiguration200Response,
} from '../../responses';

export class ProtocolAuthWellKnownsService {
  private protocol: ProtocolFrontendClient;

  constructor(protocol: ProtocolFrontendClient) {
    this.protocol = protocol;
  }

  jwks(
    options?: FrontendGetWellKnownJWKSOptions,
  ): Promise<FrontendGetWellKnownJWKS200Response> {
    return this.protocol.client.request<FrontendGetWellKnownJWKS200Response>(
      'GET',
      FrontendGetWellKnownJWKSPath,
      options,
    );
  }

  openidConfiguration(
    options?: FrontendGetWellKnownOpenIDConfigurationOptions,
  ): Promise<FrontendGetWellKnownOpenIDConfiguration200Response> {
    return this.protocol.client.request<FrontendGetWellKnownOpenIDConfiguration200Response>(
      'GET',
      FrontendGetWellKnownOpenIDConfigurationPath,
      options,
    );
  }
}
