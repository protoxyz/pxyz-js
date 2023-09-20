import { RequestOptions } from '@/client';

export interface CreateNotificationOptions extends RequestOptions {
  body: {
    tenantId: string;
    channel: string;
    template: string;
    variables?: Record<any, any> | null;
  };
  path?: never;
  query?: never;
}

export interface CreateNotificationByIdsOptions extends RequestOptions {
  body: {
    tenantId: string;
    channelId: string;
    templateId: string;
    variables?: Record<any, any> | null;
  };
  path?: never;
  query?: never;
}
