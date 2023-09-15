import {
  FrontendDeleteUserPath,
  FrontendGetUserProfilePath,
  FrontendUpdateUserProfilePath,
} from '@/frontend/paths';
import { ProtocolFrontendClient } from '../../pxyz';
import {
  FrontendDeleteUserOptions,
  FrontendGetUserProfileOptions,
  FrontendUpdateUserProfileOptions,
} from '../../requests';
import {
  FrontendDeleteUser200Response,
  FrontendGetUserProfile200Response,
} from '../../responses';

export class ProtocolAuthUsersService {
  private protocol: ProtocolFrontendClient;

  constructor(protocol: ProtocolFrontendClient) {
    this.protocol = protocol;
  }

  profile(
    options?: FrontendGetUserProfileOptions,
  ): Promise<FrontendGetUserProfile200Response> {
    return this.protocol.client.request<FrontendGetUserProfile200Response>(
      'GET',
      FrontendGetUserProfilePath,
      options,
    );
  }

  updateProfile(
    options?: FrontendUpdateUserProfileOptions,
  ): Promise<FrontendGetUserProfile200Response> {
    return this.protocol.client.request<FrontendGetUserProfile200Response>(
      'PUT',
      FrontendUpdateUserProfilePath,
      options,
    );
  }

  delete(
    options?: FrontendDeleteUserOptions,
  ): Promise<FrontendDeleteUser200Response> {
    return this.protocol.client.request<FrontendDeleteUser200Response>(
      'DELETE',
      FrontendDeleteUserPath,
      options,
    );
  }
}
