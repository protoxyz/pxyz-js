import { RequestOptions } from '@/client';
import { NotificationProvider, NotificationType } from '@protoxyz/types';

export interface ListNotificationTemplatesOptions extends RequestOptions {
  body?: never;
  path?: never;
  query?: {
    cursor?: string | undefined;
    perPage?: string;
  };
}

export interface GetNotificationTemplateOptions extends RequestOptions {
  body?: never;
  path: {
    templateId: string;
  };
  query?: never;
}

export interface CreateNotificationTemplateOptions extends RequestOptions {
  body: {
    tenantId: string;
    type: NotificationType;
    name: string;
    body: Record<any, any>;
  };
  path?: never;
  query?: never;
}

export interface UpdateNotificationTemplateOptions extends RequestOptions {
  body: {
    type?: NotificationType;
    name?: string;
    body?: Record<any, any>;
  };
  path: {
    templateId: string;
  };
  query?: never;
}

export interface DeleteNotificationTemplateOptions extends RequestOptions {
  body?: never;
  path: {
    templateId: string;
  };
  query?: never;
}
