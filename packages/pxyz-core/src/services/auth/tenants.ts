import { Protocol } from '../../pxyz';
import { GetTenant200Response } from '../../responses';
import {
  GetTenantByDomainOptions,
  GetTenantByIdOptions,
  GetTenantByPublicKeyOptions,
} from '../../requests';

export const GetTenantByDomainPath =
  '/api/auth/frontend/v0/tenants/domain/{domain}';
export const GetTenantByIdPath = '/api/auth/frontend/v0/tenants/id/{id}';
export const GetTenantByPublicKeyPath =
  '/api/auth/frontend/v0/tenants/pkey/{publicKey}';

export class ProtocolAuthTenantsService {
  private protocol: Protocol;

  constructor(protocol: Protocol) {
    this.protocol = protocol;
  }

  getByPublicKey(
    options?: GetTenantByPublicKeyOptions,
  ): Promise<GetTenant200Response> {
    return this.protocol.client.request<GetTenant200Response>(
      'GET',
      GetTenantByPublicKeyPath,
      options,
    );
  }

  getById(options?: GetTenantByIdOptions): Promise<GetTenant200Response> {
    return this.protocol.client.request<GetTenant200Response>(
      'GET',
      GetTenantByIdPath,
      options,
    );
  }

  getByDomain(
    options?: GetTenantByDomainOptions,
  ): Promise<GetTenant200Response> {
    return this.protocol.client.request<GetTenant200Response>(
      'GET',
      GetTenantByDomainPath,
      options,
    );
  }
}
