import { ProtocolBackendClient } from '@/backend/pxyz';
import {
  CreateUserOptions,
  DeleteUserOptions,
  GetUserOptions,
  ListUsersOptions,
  UpdateUserOptions,
} from './requests';
import {
  CreateUser201Response,
  DeleteUser200Response,
  GetUser200Response,
  ListUsers200Response,
  UpdateUser200Response,
} from './responses';

export const ListUsersPath = '/v0/tenants/{tenantId}/auth/users';
export const CreateUserPath = '/v0/auth/users';
export const GetUserPath = '/v0/auth/users/{userId}';
export const DeleteUserPath = '/v0/users/{userId}';
export const UpdateUserPath = '/v0/users/{userId}';

export class ProtocolAuthUsersService {
  private protocol: ProtocolBackendClient;

  constructor(protocol: ProtocolBackendClient) {
    this.protocol = protocol;
  }

  list(options?: ListUsersOptions): Promise<ListUsers200Response> {
    return this.protocol.client.request<ListUsers200Response>(
      'GET',
      ListUsersPath,
      options,
    );
  }

  get(options?: GetUserOptions): Promise<GetUser200Response> {
    return this.protocol.client.request<GetUser200Response>(
      'GET',
      GetUserPath,
      options,
    );
  }

  create(options?: CreateUserOptions): Promise<CreateUser201Response> {
    return this.protocol.client.request<CreateUser201Response>(
      'POST',
      CreateUserPath,
      options,
    );
  }

  update(options?: UpdateUserOptions): Promise<UpdateUser200Response> {
    return this.protocol.client.request<UpdateUser200Response>(
      'PUT',
      UpdateUserPath,
      options,
    );
  }

  delete(options?: DeleteUserOptions): Promise<DeleteUser200Response> {
    return this.protocol.client.request<DeleteUser200Response>(
      'DELETE',
      DeleteUserPath,
      options,
    );
  }
}
