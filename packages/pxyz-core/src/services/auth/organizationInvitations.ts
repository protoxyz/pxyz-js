import { Protocol } from '../../pxyz';
import {
  AcceptOrganizationInvitationOptions,
  CreateOrganizationInvitationOptions,
  DeclineOrganizationInvitationOptions,
  DeleteOrganizationInvitationOptions,
  GetOrganizationInvitationOptions,
  ListOrganizationInvitationsOptions,
  ResendOrganizationInvitationOptions,
  UpdateOrganizationInvitationOptions,
} from '../../requests';
import {
  AcceptOrganizationInvitation200Response,
  CreateOrganizationInvitation201Response,
  DeclineOrganizationInvitation200Response,
  DeleteOrganizationInvitation200Response,
  GetOrganizationInvitation200Response,
  ListOrganizationInvitations200Response,
  ResendOrganizationInvitation200Response,
  UpdateOrganizationInvitation200Response,
} from '../../responses';

export const ListOrganizationInvitationsPath =
  '/api/auth/frontend/v0/organizations/{organizationId}/invitations';
export const GetOrganizationInvitationPath =
  '/api/auth/frontend/v0/organizations/{organizationId}/invitations/{userId}';
export const CreateOrganizationInvitationPath =
  '/api/auth/frontend/v0/organizations/{organizationId}/invitations';
export const UpdateOrganizationInvitationPath =
  '/api/auth/frontend/v0/organizations/{organizationId}/invitations/{userId}';
export const DeleteOrganizationInvitationPath =
  '/api/auth/frontend/v0/organizations/{organizationId}/invitations/{userId}';
export const AcceptOrganizationInvitationPath =
  '/api/auth/frontend/v0/organizations/{organizationId}/invitations/{userId}/accept';
export const DeclineOrganizationInvitationPath =
  '/api/auth/frontend/v0/organizations/{organizationId}/invitations/{userId}/decline';
export const ResendOrganizationInvitationPath =
  '/api/auth/frontend/v0/organizations/{organizationId}/invitations/{userId}/resend';

export class ProtocolAuthOrganizationInvitationsService {
  private protocol: Protocol;

  constructor(protocolAuth: Protocol) {
    this.protocol = protocolAuth;
  }

  list(
    options?: ListOrganizationInvitationsOptions,
  ): Promise<ListOrganizationInvitations200Response> {
    return this.protocol.client.request<ListOrganizationInvitations200Response>(
      'GET',
      ListOrganizationInvitationsPath,
      options,
    );
  }

  get(
    options: GetOrganizationInvitationOptions,
  ): Promise<GetOrganizationInvitation200Response> {
    return this.protocol.client.request<GetOrganizationInvitation200Response>(
      'GET',
      GetOrganizationInvitationPath,
      options,
    );
  }

  create(
    options: CreateOrganizationInvitationOptions,
  ): Promise<CreateOrganizationInvitation201Response> {
    return this.protocol.client.request<CreateOrganizationInvitation201Response>(
      'POST',
      CreateOrganizationInvitationPath,
      options,
    );
  }

  update(
    options: UpdateOrganizationInvitationOptions,
  ): Promise<UpdateOrganizationInvitation200Response> {
    return this.protocol.client.request<UpdateOrganizationInvitation200Response>(
      'PUT',
      UpdateOrganizationInvitationPath,
      options,
    );
  }

  delete(
    options: DeleteOrganizationInvitationOptions,
  ): Promise<DeleteOrganizationInvitation200Response> {
    return this.protocol.client.request<DeleteOrganizationInvitation200Response>(
      'DELETE',
      DeleteOrganizationInvitationPath,
      options,
    );
  }

  accept(
    options: AcceptOrganizationInvitationOptions,
  ): Promise<AcceptOrganizationInvitation200Response> {
    return this.protocol.client.request<AcceptOrganizationInvitation200Response>(
      'POST',
      AcceptOrganizationInvitationPath,
      options,
    );
  }

  decline(
    options: DeclineOrganizationInvitationOptions,
  ): Promise<DeclineOrganizationInvitation200Response> {
    return this.protocol.client.request<DeclineOrganizationInvitation200Response>(
      'POST',
      DeclineOrganizationInvitationPath,
      options,
    );
  }

  resend(
    options: ResendOrganizationInvitationOptions,
  ): Promise<ResendOrganizationInvitation200Response> {
    return this.protocol.client.request<ResendOrganizationInvitation200Response>(
      'POST',
      ResendOrganizationInvitationPath,
      options,
    );
  }
}
