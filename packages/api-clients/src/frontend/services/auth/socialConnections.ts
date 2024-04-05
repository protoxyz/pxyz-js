import {
  FrontendCreateSocialConnectionPath,
  FrontendDeleteSocialConnectionPath,
  FrontendGetSocialConnectionPath,
  FrontendListSocialConnectionsPath,
  FrontendUpdateSocialConnectionPath,
} from '@/frontend/paths';
import { ProtocolFrontendClient } from '../../pxyz';
import {
  FrontendCreateSocialConnectionsOptions,
  FrontendDeleteSocialConnectionOptions,
  FrontendGetSocialConnectionOptions,
  FrontendListSocialConnectionsOptions,
  FrontendUpdateSocialConnectionOptions,
} from '../../requests';
import {
  FrontendCreateSocialConnection200Response,
  FrontendDeleteSocialConnection200Response,
  FrontendGetSocialConnection200Response,
  FrontendListSocialConnections200Response,
  FrontendUpdateSocialConnection200Response,
} from '../../responses';

export class ProtocolAuthSocialConnectionsService {
  private protocol: ProtocolFrontendClient;

  constructor(protocol: ProtocolFrontendClient) {
    this.protocol = protocol;
  }

  list(
    options?: FrontendListSocialConnectionsOptions,
  ): Promise<FrontendListSocialConnections200Response> {
    return this.protocol.client.request<FrontendListSocialConnections200Response>(
      'GET',
      FrontendListSocialConnectionsPath,
      options,
    );
  }

  create(
    options?: FrontendCreateSocialConnectionsOptions,
  ): Promise<FrontendCreateSocialConnection200Response> {
    return this.protocol.client.request<FrontendCreateSocialConnection200Response>(
      'POST',
      FrontendCreateSocialConnectionPath,
      options,
    );
  }

  delete(
    options?: FrontendDeleteSocialConnectionOptions,
  ): Promise<FrontendDeleteSocialConnection200Response> {
    return this.protocol.client.request<FrontendDeleteSocialConnection200Response>(
      'DELETE',
      FrontendDeleteSocialConnectionPath,
      options,
    );
  }

  get(
    options?: FrontendGetSocialConnectionOptions,
  ): Promise<FrontendGetSocialConnection200Response> {
    return this.protocol.client.request<FrontendGetSocialConnection200Response>(
      'GET',
      FrontendGetSocialConnectionPath,
      options,
    );
  }

  update(
    options?: FrontendUpdateSocialConnectionOptions,
  ): Promise<FrontendUpdateSocialConnection200Response> {
    return this.protocol.client.request<FrontendUpdateSocialConnection200Response>(
      'PATCH',
      FrontendUpdateSocialConnectionPath,
      options,
    );
  }
}
