import {
  FrontendCreateOrganizationRolePath,
  FrontendDeleteOrganizationRolePath,
  FrontendGetOrganizationRolePath,
  FrontendListOrganizationRolesPath,
  FrontendUpdateOrganizationRolePath,
} from '@/frontend/paths';
import { ProtocolFrontendClient } from '../../pxyz';
import {
  FrontendCreateOrganizationRoleOptions,
  FrontendGetOrganizationRoleOptions,
  FrontendListOrganizationRolesOptions,
  FrontendUpdateOrganizationRoleOptions,
  FrontendDeleteOrganizationRoleOptions,
} from '../../requests';
import {
  FrontendCreateOrganizationRole201Response,
  FrontendDeleteOrganizationRole200Response,
  FrontendGetOrganizationRole200Response,
  FrontendListOrganizationRoles200Response,
  FrontendUpdateOrganizationRole200Response,
} from '../../responses';

export class ProtocolAuthOrganizationRolesService {
  private protocol: ProtocolFrontendClient;

  constructor(protocolAuth: ProtocolFrontendClient) {
    this.protocol = protocolAuth;
  }

  list(
    options?: FrontendListOrganizationRolesOptions,
  ): Promise<FrontendListOrganizationRoles200Response> {
    return this.protocol.client.request<FrontendListOrganizationRoles200Response>(
      'GET',
      FrontendListOrganizationRolesPath,
      options,
    );
  }

  get(
    options: FrontendGetOrganizationRoleOptions,
  ): Promise<FrontendGetOrganizationRole200Response> {
    return this.protocol.client.request<FrontendGetOrganizationRole200Response>(
      'GET',
      FrontendGetOrganizationRolePath,
      options,
    );
  }

  create(
    options: FrontendCreateOrganizationRoleOptions,
  ): Promise<FrontendCreateOrganizationRole201Response> {
    return this.protocol.client.request<FrontendCreateOrganizationRole201Response>(
      'POST',
      FrontendCreateOrganizationRolePath,
      options,
    );
  }

  update(
    options: FrontendUpdateOrganizationRoleOptions,
  ): Promise<FrontendUpdateOrganizationRole200Response> {
    return this.protocol.client.request<FrontendUpdateOrganizationRole200Response>(
      'PUT',
      FrontendUpdateOrganizationRolePath,
      options,
    );
  }

  delete(
    options: FrontendDeleteOrganizationRoleOptions,
  ): Promise<FrontendDeleteOrganizationRole200Response> {
    return this.protocol.client.request<FrontendDeleteOrganizationRole200Response>(
      'DELETE',
      FrontendDeleteOrganizationRolePath,
      options,
    );
  }
}
