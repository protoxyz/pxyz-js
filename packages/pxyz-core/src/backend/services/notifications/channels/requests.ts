import { RequestOptions } from '@/client';
import { NotificationProvider, NotificationType } from '@protoxyz/types';

export interface ListNotificationChannelsOptions extends RequestOptions {
  body?: never;
  path?: never;
  query?: {
    cursor?: string | undefined;
    perPage?: string;
  };
}

export interface GetNotificationChannelOptions extends RequestOptions {
  body?: never;
  path: {
    channelId: string;
  };
  query?: never;
}

export interface CreateNotificationChannelOptions extends RequestOptions {
  body: {
    tenantId: string;
    key: string;
    description?: string | null;
    name: string;
    type: NotificationType;
    provider: NotificationProvider;
    providerSettings?: Record<any, any> | null;
  };
  path?: never;
  query?: never;
}

export interface UpdateNotificationChannelOptions extends RequestOptions {
  body: {
    key?: string;
    description?: string | null;
    name?: string;
    type?: NotificationType;
    provider?: NotificationProvider;
    providerSettings?: Record<any, any> | null;
  };
  path: {
    channelId: string;
  };
  query?: never;
}

export interface DeleteNotificationChannelOptions extends RequestOptions {
  body?: never;
  path: {
    channelId: string;
  };
  query?: never;
}
