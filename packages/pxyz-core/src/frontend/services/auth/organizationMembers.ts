import {
  FrontendCreateOrganizationMemberPath,
  FrontendDeleteOrganizationMemberPath,
  FrontendGetOrganizationMemberPath,
  FrontendListOrganizationMembersPath,
  FrontendUpdateOrganizationMemberPath,
} from '@/frontend/paths';
import { ProtocolFrontendClient } from '../../pxyz';
import {
  FrontendCreateOrganizationMemberOptions,
  FrontendDeleteOrganizationMemberOptions,
  FrontendGetOrganizationMemberOptions,
  FrontendListOrganizationMembersOptions,
  FrontendUpdateOrganizationMemberOptions,
} from '../../requests';
import {
  FrontendCreateOrganizationMember201Response,
  FrontendDeleteOrganizationMember200Response,
  FrontendGetOrganizationMember200Response,
  FrontendListOrganizationMembers200Response,
  FrontendUpdateOrganizationMember200Response,
} from '../../responses';

export class ProtocolAuthOrganizationMembersService {
  private protocol: ProtocolFrontendClient;

  constructor(protocolAuth: ProtocolFrontendClient) {
    this.protocol = protocolAuth;
  }

  list(
    options?: FrontendListOrganizationMembersOptions,
  ): Promise<FrontendListOrganizationMembers200Response> {
    return this.protocol.client.request<FrontendListOrganizationMembers200Response>(
      'GET',
      FrontendListOrganizationMembersPath,
      options,
    );
  }

  get(
    options: FrontendGetOrganizationMemberOptions,
  ): Promise<FrontendGetOrganizationMember200Response> {
    return this.protocol.client.request<FrontendGetOrganizationMember200Response>(
      'GET',
      FrontendGetOrganizationMemberPath,
      options,
    );
  }

  create(
    options: FrontendCreateOrganizationMemberOptions,
  ): Promise<FrontendCreateOrganizationMember201Response> {
    return this.protocol.client.request<FrontendCreateOrganizationMember201Response>(
      'POST',
      FrontendCreateOrganizationMemberPath,
      options,
    );
  }

  update(
    options: FrontendUpdateOrganizationMemberOptions,
  ): Promise<FrontendUpdateOrganizationMember200Response> {
    return this.protocol.client.request<FrontendUpdateOrganizationMember200Response>(
      'PUT',
      FrontendUpdateOrganizationMemberPath,
      options,
    );
  }

  delete(
    options: FrontendDeleteOrganizationMemberOptions,
  ): Promise<FrontendDeleteOrganizationMember200Response> {
    return this.protocol.client.request<FrontendDeleteOrganizationMember200Response>(
      'DELETE',
      FrontendDeleteOrganizationMemberPath,
      options,
    );
  }
}
