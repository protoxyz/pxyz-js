import { Protocol } from '../../pxyz';
import {
  CreateOrganizationMemberOptions,
  DeleteOrganizationMemberOptions,
  GetOrganizationMemberOptions,
  ListOrganizationMembersOptions,
  UpdateOrganizationMemberOptions,
} from '../../requests';
import {
  CreateOrganizationMember201Response,
  DeleteOrganizationMember200Response,
  GetOrganizationMember200Response,
  ListOrganizationMembers200Response,
  UpdateOrganizationMember200Response,
} from '../../responses';

export const ListOrganizationMembersPath =
  '/api/auth/frontend/v0/user/organizations/{organizationId}/members';
export const GetOrganizationMemberPath =
  '/api/auth/frontend/v0/user/organizations/{organizationId}/members/{userId}';
export const CreateOrganizationMemberPath =
  '/api/auth/frontend/v0/user/organizations/{organizationId}/members';
export const UpdateOrganizationMemberPath =
  '/api/auth/frontend/v0/user/organizations/{organizationId}/members/{userId}';
export const DeleteOrganizationMemberPath =
  '/api/auth/frontend/v0/user/organizations/{organizationId}/members/{userId}';

export class ProtocolAuthOrganizationMembersService {
  private protocol: Protocol;

  constructor(protocolAuth: Protocol) {
    this.protocol = protocolAuth;
  }

  list(
    options?: ListOrganizationMembersOptions,
  ): Promise<ListOrganizationMembers200Response> {
    return this.protocol.client.request<ListOrganizationMembers200Response>(
      'GET',
      ListOrganizationMembersPath,
      options,
    );
  }

  get(
    options: GetOrganizationMemberOptions,
  ): Promise<GetOrganizationMember200Response> {
    return this.protocol.client.request<GetOrganizationMember200Response>(
      'GET',
      GetOrganizationMemberPath,
      options,
    );
  }

  create(
    options: CreateOrganizationMemberOptions,
  ): Promise<CreateOrganizationMember201Response> {
    return this.protocol.client.request<CreateOrganizationMember201Response>(
      'POST',
      CreateOrganizationMemberPath,
      options,
    );
  }

  update(
    options: UpdateOrganizationMemberOptions,
  ): Promise<UpdateOrganizationMember200Response> {
    return this.protocol.client.request<UpdateOrganizationMember200Response>(
      'PUT',
      UpdateOrganizationMemberPath,
      options,
    );
  }

  delete(
    options: DeleteOrganizationMemberOptions,
  ): Promise<DeleteOrganizationMember200Response> {
    return this.protocol.client.request<DeleteOrganizationMember200Response>(
      'DELETE',
      DeleteOrganizationMemberPath,
      options,
    );
  }
}
