import { Protocol } from '../../pxyz';
import {
  CreateOrganizationRoleOptions,
  GetOrganizationRoleOptions,
  ListOrganizationRolesOptions,
  UpdateOrganizationRoleOptions,
  DeleteOrganizationRoleOptions,
} from '../../requests';
import {
  CreateOrganizationRole201Response,
  DeleteOrganizationRole200Response,
  GetOrganizationRole200Response,
  ListOrganizationRoles200Response,
  UpdateOrganizationRole200Response,
} from '../../responses';

export const ListOrganizationRolesPath =
  '/api/auth/frontend/v0/organizations/{organizationId}/roles';
export const GetOrganizationRolePath =
  '/api/auth/frontend/v0/organizations/{organizationId}/roles/{userId}';
export const CreateOrganizationRolePath =
  '/api/auth/frontend/v0/organizations/{organizationId}/roles';
export const UpdateOrganizationRolePath =
  '/api/auth/frontend/v0/organizations/{organizationId}/roles/{userId}';
export const DeleteOrganizationRolePath =
  '/api/auth/frontend/v0/organizations/{organizationId}/roles/{userId}';

export class ProtocolAuthOrganizationRolesService {
  private protocol: Protocol;

  constructor(protocolAuth: Protocol) {
    this.protocol = protocolAuth;
  }

  list(
    options?: ListOrganizationRolesOptions,
  ): Promise<ListOrganizationRoles200Response> {
    return this.protocol.client.request<ListOrganizationRoles200Response>(
      'GET',
      ListOrganizationRolesPath,
      options,
    );
  }

  get(
    options: GetOrganizationRoleOptions,
  ): Promise<GetOrganizationRole200Response> {
    return this.protocol.client.request<GetOrganizationRole200Response>(
      'GET',
      GetOrganizationRolePath,
      options,
    );
  }

  create(
    options: CreateOrganizationRoleOptions,
  ): Promise<CreateOrganizationRole201Response> {
    return this.protocol.client.request<CreateOrganizationRole201Response>(
      'POST',
      CreateOrganizationRolePath,
      options,
    );
  }

  update(
    options: UpdateOrganizationRoleOptions,
  ): Promise<UpdateOrganizationRole200Response> {
    return this.protocol.client.request<UpdateOrganizationRole200Response>(
      'PUT',
      UpdateOrganizationRolePath,
      options,
    );
  }

  delete(
    options: DeleteOrganizationRoleOptions,
  ): Promise<DeleteOrganizationRole200Response> {
    return this.protocol.client.request<DeleteOrganizationRole200Response>(
      'DELETE',
      DeleteOrganizationRolePath,
      options,
    );
  }
}
