import { ProtocolBackendClient } from '@/backend/pxyz';
import {
  CreateTenantOptions,
  GetTenantByIdOptions,
  GetTenantBySlugOptions,
  ListTenantsOptions,
  UpdateTenantOptions,
} from './requests';
import { GetTenant200Response, ListTenants200Response } from './responses';

export const ListTenantsPath = '/api/v0/tenants';
export const GetTenantByIdPath = '/api/v0/tenants/{tenantId}';
export const GetTenantBySlugPath = '/api/v0/tenants/slug/{tenantId}';
export const GetTenantByDomainPath = '/api/v0/tenants/domain/{tenantId}';
export const CreateTenantPath = '/api/v0/tenants';
export const UpdateTenantPath = '/api/v0/tenants/{tenantId}';

export class ProtocolTenantsService {
  private protocol: ProtocolBackendClient;

  constructor(protocol: ProtocolBackendClient) {
    this.protocol = protocol;
  }

  list(options?: ListTenantsOptions): Promise<ListTenants200Response> {
    return this.protocol.client.request<ListTenants200Response>(
      'GET',
      ListTenantsPath,
      options,
    );
  }

  get(options?: GetTenantByIdOptions): Promise<GetTenant200Response> {
    return this.protocol.client.request<GetTenant200Response>(
      'GET',
      GetTenantByIdPath,
      options,
    );
  }

  getBySlug(options?: GetTenantBySlugOptions): Promise<GetTenant200Response> {
    return this.protocol.client.request<GetTenant200Response>(
      'GET',
      GetTenantBySlugPath,
      options,
    );
  }

  getByDomain(options?: GetTenantBySlugOptions): Promise<GetTenant200Response> {
    return this.protocol.client.request<GetTenant200Response>(
      'GET',
      GetTenantByDomainPath,
      options,
    );
  }

  create(options?: CreateTenantOptions): Promise<GetTenant200Response> {
    return this.protocol.client.request<GetTenant200Response>(
      'POST',
      CreateTenantPath,
      options,
    );
  }

  update(options?: UpdateTenantOptions): Promise<GetTenant200Response> {
    return this.protocol.client.request<GetTenant200Response>(
      'PUT',
      UpdateTenantPath,
      options,
    );
  }
}
