import {
  FrontendAcceptOrganizationInvitationPath,
  FrontendCreateOrganizationInvitationPath,
  FrontendDeclineOrganizationInvitationPath,
  FrontendDeleteOrganizationInvitationPath,
  FrontendGetOrganizationInvitationPath,
  FrontendListOrganizationInvitationsPath,
  FrontendResendOrganizationInvitationPath,
  FrontendUpdateOrganizationInvitationPath,
} from '@/frontend/paths';
import { ProtocolFrontendClient } from '../../pxyz';
import {
  FrontendAcceptOrganizationInvitationOptions,
  FrontendCreateOrganizationInvitationOptions,
  FrontendDeclineOrganizationInvitationOptions,
  FrontendDeleteOrganizationInvitationOptions,
  FrontendGetOrganizationInvitationOptions,
  FrontendListOrganizationInvitationsOptions,
  FrontendResendOrganizationInvitationOptions,
  FrontendUpdateOrganizationInvitationOptions,
} from '../../requests';
import {
  FrontendAcceptOrganizationInvitation200Response,
  FrontendCreateOrganizationInvitation201Response,
  FrontendDeclineOrganizationInvitation200Response,
  FrontendDeleteOrganizationInvitation200Response,
  FrontendGetOrganizationInvitation200Response,
  FrontendListOrganizationInvitations200Response,
  FrontendResendOrganizationInvitation200Response,
  FrontendUpdateOrganizationInvitation200Response,
} from '../../responses';

export class ProtocolAuthOrganizationInvitationsService {
  private protocol: ProtocolFrontendClient;

  constructor(protocolAuth: ProtocolFrontendClient) {
    this.protocol = protocolAuth;
  }

  list(
    options?: FrontendListOrganizationInvitationsOptions,
  ): Promise<FrontendListOrganizationInvitations200Response> {
    return this.protocol.client.request<FrontendListOrganizationInvitations200Response>(
      'GET',
      FrontendListOrganizationInvitationsPath,
      options,
    );
  }

  get(
    options: FrontendGetOrganizationInvitationOptions,
  ): Promise<FrontendGetOrganizationInvitation200Response> {
    return this.protocol.client.request<FrontendGetOrganizationInvitation200Response>(
      'GET',
      FrontendGetOrganizationInvitationPath,
      options,
    );
  }

  create(
    options: FrontendCreateOrganizationInvitationOptions,
  ): Promise<FrontendCreateOrganizationInvitation201Response> {
    return this.protocol.client.request<FrontendCreateOrganizationInvitation201Response>(
      'POST',
      FrontendCreateOrganizationInvitationPath,
      options,
    );
  }

  update(
    options: FrontendUpdateOrganizationInvitationOptions,
  ): Promise<FrontendUpdateOrganizationInvitation200Response> {
    return this.protocol.client.request<FrontendUpdateOrganizationInvitation200Response>(
      'PUT',
      FrontendUpdateOrganizationInvitationPath,
      options,
    );
  }

  delete(
    options: FrontendDeleteOrganizationInvitationOptions,
  ): Promise<FrontendDeleteOrganizationInvitation200Response> {
    return this.protocol.client.request<FrontendDeleteOrganizationInvitation200Response>(
      'DELETE',
      FrontendDeleteOrganizationInvitationPath,
      options,
    );
  }

  accept(
    options: FrontendAcceptOrganizationInvitationOptions,
  ): Promise<FrontendAcceptOrganizationInvitation200Response> {
    return this.protocol.client.request<FrontendAcceptOrganizationInvitation200Response>(
      'POST',
      FrontendAcceptOrganizationInvitationPath,
      options,
    );
  }

  decline(
    options: FrontendDeclineOrganizationInvitationOptions,
  ): Promise<FrontendDeclineOrganizationInvitation200Response> {
    return this.protocol.client.request<FrontendDeclineOrganizationInvitation200Response>(
      'POST',
      FrontendDeclineOrganizationInvitationPath,
      options,
    );
  }

  resend(
    options: FrontendResendOrganizationInvitationOptions,
  ): Promise<FrontendResendOrganizationInvitation200Response> {
    return this.protocol.client.request<FrontendResendOrganizationInvitation200Response>(
      'POST',
      FrontendResendOrganizationInvitationPath,
      options,
    );
  }
}
