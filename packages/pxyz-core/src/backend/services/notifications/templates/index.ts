import { ProtocolBackendClient } from '../../../pxyz';
import {
  CreateNotificationTemplateOptions,
  DeleteNotificationTemplateOptions,
  GetNotificationTemplateOptions,
  ListNotificationTemplatesOptions,
  UpdateNotificationTemplateOptions,
} from './requests';
import {
  CreateNotificationTemplate201Response,
  DeleteNotificationTemplate200Response,
  GetNotificationTemplate200Response,
  ListNotificationTemplates200Response,
  UpdateNotificationTemplate200Response,
} from './responses';

export const ListNotificationTemplatesPath =
  '/api/v0/tenants/{tenantId}/notifications/templates';
export const GetNotificationTemplatePath =
  '/api/v0/notifications/templates/{templateId}';
export const DeleteNotificationTemplatePath =
  '/api/v0/notifications/templates/{templateId}';

export class ProtocolNotificationTemplatesService {
  private protocol: ProtocolBackendClient;

  constructor(protocol: ProtocolBackendClient) {
    this.protocol = protocol;
  }

  list(
    options?: ListNotificationTemplatesOptions,
  ): Promise<ListNotificationTemplates200Response> {
    return this.protocol.client.request<ListNotificationTemplates200Response>(
      'GET',
      ListNotificationTemplatesPath,
      options,
    );
  }

  get(
    options?: GetNotificationTemplateOptions,
  ): Promise<GetNotificationTemplate200Response> {
    return this.protocol.client.request<GetNotificationTemplate200Response>(
      'GET',
      GetNotificationTemplatePath,
      options,
    );
  }

  create(
    options?: CreateNotificationTemplateOptions,
  ): Promise<CreateNotificationTemplate201Response> {
    return this.protocol.client.request<CreateNotificationTemplate201Response>(
      'POST',
      ListNotificationTemplatesPath,
      options,
    );
  }

  update(
    options?: UpdateNotificationTemplateOptions,
  ): Promise<UpdateNotificationTemplate200Response> {
    return this.protocol.client.request<UpdateNotificationTemplate200Response>(
      'PUT',
      GetNotificationTemplatePath,
      options,
    );
  }

  delete(
    options?: DeleteNotificationTemplateOptions,
  ): Promise<DeleteNotificationTemplate200Response> {
    return this.protocol.client.request<DeleteNotificationTemplate200Response>(
      'DELETE',
      DeleteNotificationTemplatePath,
      options,
    );
  }
}
