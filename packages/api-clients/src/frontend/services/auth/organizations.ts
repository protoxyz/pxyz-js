import {
  FrontendCreateOrganizationPath,
  FrontendDeleteOrganizationPath,
  FrontendGetOrganizationPath,
  FrontendListOrganizationsPath,
  FrontendUpdateOrganizationPath,
} from '@/frontend/paths';
import { ProtocolFrontendClient } from '../../pxyz';
import {
  FrontendCreateOrganizationOptions,
  FrontendGetOrganizationOptions,
  FrontendDeleteOrganizationOptions,
  FrontendUpdateOrganizationOptions,
  FrontendListOrganizationsOptions,
} from '../../requests';
import {
  FrontendCreateOrganization201Response,
  FrontendDeleteOrganization200Response,
  FrontendGetOrganization200Response,
  FrontendListOrganizations200Response,
  FrontendUpdateOrganization200Response,
} from '../../responses';

export class ProtocolAuthOrganizationsService {
  private protocol: ProtocolFrontendClient;

  constructor(protocolAuth: ProtocolFrontendClient) {
    this.protocol = protocolAuth;
  }

  list(
    options?: FrontendListOrganizationsOptions,
  ): Promise<FrontendListOrganizations200Response> {
    return this.protocol.client.request<FrontendListOrganizations200Response>(
      'GET',
      FrontendListOrganizationsPath,
      options,
    );
  }

  get(
    options?: FrontendGetOrganizationOptions,
  ): Promise<FrontendGetOrganization200Response> {
    return this.protocol.client.request<FrontendGetOrganization200Response>(
      'GET',
      FrontendGetOrganizationPath,
      options,
    );
  }

  create(
    options?: FrontendCreateOrganizationOptions,
  ): Promise<FrontendCreateOrganization201Response> {
    return this.protocol.client.request<FrontendCreateOrganization201Response>(
      'POST',
      FrontendCreateOrganizationPath,
      options,
    );
  }

  update(
    options?: FrontendUpdateOrganizationOptions,
  ): Promise<FrontendUpdateOrganization200Response> {
    return this.protocol.client.request<FrontendUpdateOrganization200Response>(
      'PUT',
      FrontendUpdateOrganizationPath,
      options,
    );
  }

  delete(
    options?: FrontendDeleteOrganizationOptions,
  ): Promise<FrontendDeleteOrganization200Response> {
    return this.protocol.client.request<FrontendDeleteOrganization200Response>(
      'DELETE',
      FrontendDeleteOrganizationPath,
      options,
    );
  }
}
