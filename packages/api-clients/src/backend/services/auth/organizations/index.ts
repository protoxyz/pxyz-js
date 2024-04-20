import { ProtocolBackendClient } from '@/backend/pxyz';
import {
  CreateOrganizationOptions,
  DeleteOrganizationOptions,
  GetOrganizationOptions,
  ListOrganizationsOptions,
  UpdateOrganizationOptions,
} from './requests';
import {
  CreateOrganization201Response,
  DeleteOrganization200Response,
  GetOrganization200Response,
  ListOrganizations200Response,
  UpdateOrganization200Response,
} from './responses';

export const ListOrganizationsPath =
  '/v0/tenants/{tenantId}/auth/organizations';
export const CreateOrganizationPath = '/v0/auth/organizations';
export const GetOrganizationPath = '/v0/auth/organizations/{organizationId}';
export const DeleteOrganizationPath = '/v0/organizations/{organizationId}';
export const UpdateOrganizationPath = '/v0/organizations/{organizationId}';

export class ProtocolAuthOrganizationsService {
  private protocol: ProtocolBackendClient;

  constructor(protocol: ProtocolBackendClient) {
    this.protocol = protocol;
  }

  list(
    options?: ListOrganizationsOptions,
  ): Promise<ListOrganizations200Response> {
    return this.protocol.client.request<ListOrganizations200Response>(
      'GET',
      ListOrganizationsPath,
      options,
    );
  }

  get(options?: GetOrganizationOptions): Promise<GetOrganization200Response> {
    return this.protocol.client.request<GetOrganization200Response>(
      'GET',
      GetOrganizationPath,
      options,
    );
  }

  create(
    options?: CreateOrganizationOptions,
  ): Promise<CreateOrganization201Response> {
    return this.protocol.client.request<CreateOrganization201Response>(
      'POST',
      CreateOrganizationPath,
      options,
    );
  }

  update(
    options?: UpdateOrganizationOptions,
  ): Promise<UpdateOrganization200Response> {
    return this.protocol.client.request<UpdateOrganization200Response>(
      'PUT',
      UpdateOrganizationPath,
      options,
    );
  }

  delete(
    options?: DeleteOrganizationOptions,
  ): Promise<DeleteOrganization200Response> {
    return this.protocol.client.request<DeleteOrganization200Response>(
      'DELETE',
      DeleteOrganizationPath,
      options,
    );
  }
}
