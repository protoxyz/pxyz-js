import { ProtocolFrontendClient } from '../../pxyz';
import { FrontendGetTenant200Response } from '../../responses';
import {
  FrontendGetTenantByDomainOptions,
  FrontendGetTenantByIdOptions,
  FrontendGetTenantByPublicKeyOptions,
} from '../../requests';
import {
  FrontendGetTenantByDomainPath,
  FrontendGetTenantByIdPath,
  FrontendGetTenantByPublicKeyPath,
} from '@/frontend/paths';

export class ProtocolAuthTenantsService {
  private protocol: ProtocolFrontendClient;

  constructor(protocol: ProtocolFrontendClient) {
    this.protocol = protocol;
  }

  getByPublicKey(
    options?: FrontendGetTenantByPublicKeyOptions,
  ): Promise<FrontendGetTenant200Response> {
    return this.protocol.client.request<FrontendGetTenant200Response>(
      'GET',
      FrontendGetTenantByPublicKeyPath,
      options,
    );
  }

  getById(
    options?: FrontendGetTenantByIdOptions,
  ): Promise<FrontendGetTenant200Response> {
    return this.protocol.client.request<FrontendGetTenant200Response>(
      'GET',
      FrontendGetTenantByIdPath,
      options,
    );
  }

  getByDomain(
    options?: FrontendGetTenantByDomainOptions,
  ): Promise<FrontendGetTenant200Response> {
    return this.protocol.client.request<FrontendGetTenant200Response>(
      'GET',
      FrontendGetTenantByDomainPath,
      options,
    );
  }
}
