import { ProtocolBackendClient } from '../../../pxyz';
import {
  SendNotificationOptions,
  SendEmailNotificationOptions,
  SendSmsNotificationOptions,
  SendPushNotificationOptions,
  SendInAppNotificationOptions,
} from './requests';
import { SendNotification201Response } from './responses';

export const SendNotificationPath = '/api/v0/notifications';

export class ProtocolNotificationsService {
  private protocol: ProtocolBackendClient;

  constructor(protocol: ProtocolBackendClient) {
    this.protocol = protocol;
  }

  email(
    body: SendEmailNotificationOptions['body'],
  ): Promise<SendNotification201Response> {
    return this.protocol.client.request<SendNotification201Response>(
      'POST',
      SendNotificationPath,
      { body },
    );
  }

  sms(
    body: SendSmsNotificationOptions['body'],
  ): Promise<SendNotification201Response> {
    return this.protocol.client.request<SendNotification201Response>(
      'POST',
      SendNotificationPath,
      { body },
    );
  }

  push(
    body: SendPushNotificationOptions['body'],
  ): Promise<SendNotification201Response> {
    return this.protocol.client.request<SendNotification201Response>(
      'POST',
      SendNotificationPath,
      { body },
    );
  }

  inApp(
    body: SendInAppNotificationOptions['body'],
  ): Promise<SendNotification201Response> {
    return this.protocol.client.request<SendNotification201Response>(
      'POST',
      SendNotificationPath,
      { body },
    );
  }

  send(
    options?: SendNotificationOptions,
  ): Promise<SendNotification201Response> {
    return this.protocol.client.request<SendNotification201Response>(
      'POST',
      SendNotificationPath,
      options,
    );
  }
}
