import { ProtocolBackendClient } from '../../../pxyz';
import {
  CreateNotificationChannelOptions,
  DeleteNotificationChannelOptions,
  GetNotificationChannelOptions,
  ListNotificationChannelsOptions,
  UpdateNotificationChannelOptions,
} from './requests';
import {
  CreateNotificationChannel201Response,
  DeleteNotificationChannel200Response,
  GetNotificationChannel200Response,
  ListNotificationChannels200Response,
  UpdateNotificationChannel200Response,
} from './responses';

export const ListNotificationChannelsPath =
  '/api/v0/tenants/{tenantId}/notifications/channels';
export const GetNotificationChannelPath =
  '/api/v0/notifications/channels/{channelId}';
export const DeleteNotificationChannelPath =
  '/api/v0/notifications/channels/{channelId}';

export class ProtocolNotificationChannelsService {
  private protocol: ProtocolBackendClient;

  constructor(protocol: ProtocolBackendClient) {
    this.protocol = protocol;
  }

  list(
    options?: ListNotificationChannelsOptions,
  ): Promise<ListNotificationChannels200Response> {
    return this.protocol.client.request<ListNotificationChannels200Response>(
      'GET',
      ListNotificationChannelsPath,
      options,
    );
  }

  get(
    options?: GetNotificationChannelOptions,
  ): Promise<GetNotificationChannel200Response> {
    return this.protocol.client.request<GetNotificationChannel200Response>(
      'GET',
      GetNotificationChannelPath,
      options,
    );
  }

  create(
    options?: CreateNotificationChannelOptions,
  ): Promise<CreateNotificationChannel201Response> {
    return this.protocol.client.request<CreateNotificationChannel201Response>(
      'POST',
      ListNotificationChannelsPath,
      options,
    );
  }

  update(
    options?: UpdateNotificationChannelOptions,
  ): Promise<UpdateNotificationChannel200Response> {
    return this.protocol.client.request<UpdateNotificationChannel200Response>(
      'PUT',
      GetNotificationChannelPath,
      options,
    );
  }

  delete(
    options?: DeleteNotificationChannelOptions,
  ): Promise<DeleteNotificationChannel200Response> {
    return this.protocol.client.request<DeleteNotificationChannel200Response>(
      'DELETE',
      DeleteNotificationChannelPath,
      options,
    );
  }
}
