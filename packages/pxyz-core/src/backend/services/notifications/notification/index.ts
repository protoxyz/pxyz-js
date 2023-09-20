import { ProtocolBackendClient } from '../../../pxyz';
import {
  CreateNotificationOptions,
  CreateNotificationByIdsOptions,
} from './requests';
import { CreateNotification201Response } from './responses';

export const CreateNotificationPath = '/api/v0/notifications';

export class ProtocolNotificationsService {
  private protocol: ProtocolBackendClient;

  constructor(protocol: ProtocolBackendClient) {
    this.protocol = protocol;
  }

  create(
    options?: CreateNotificationOptions,
  ): Promise<CreateNotification201Response> {
    return this.protocol.client.request<CreateNotification201Response>(
      'POST',
      CreateNotificationPath,
      options,
    );
  }

  createByIds(
    options?: CreateNotificationByIdsOptions,
  ): Promise<CreateNotification201Response> {
    return this.protocol.client.request<CreateNotification201Response>(
      'POST',
      CreateNotificationPath,
      options,
    );
  }
}
