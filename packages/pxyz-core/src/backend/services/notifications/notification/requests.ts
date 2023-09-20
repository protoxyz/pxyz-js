import { RequestOptions } from '@/client';

export interface SendNotificationOptions extends RequestOptions {
  body: {
    tenantId: string;
    channel: string;
    template: string;
    variables?: Record<any, any> | null;
    input: Record<any, any>;
  };
  path?: never;
  query?: never;
}

export interface SendEmailNotificationOptions extends RequestOptions {
  body: {
    tenantId: string;
    channel: string;
    template: string;
    variables?: Record<any, any> | null;
    input: {
      to: string[];
      cc?: string[];
      bcc?: string[];
    };
  };
  path?: never;
  query?: never;
}

export interface SendSmsNotificationOptions extends RequestOptions {
  body: {
    tenantId: string;
    channel: string;
    template: string;
    variables?: Record<any, any> | null;
    input: {
      to: string[];
    };
  };
  path?: never;
  query?: never;
}

export interface SendPushNotificationOptions extends RequestOptions {
  body: {
    tenantId: string;
    channel: string;
    template: string;
    variables?: Record<any, any> | null;
    input: {
      to: string[];
    };
  };
  path?: never;
  query?: never;
}

export interface SendInAppNotificationOptions extends RequestOptions {
  body: {
    tenantId: string;
    channel: string;
    template: string;
    variables?: Record<any, any> | null;
    input: {
      to: string[];
    };
  };
  path?: never;
  query?: never;
}

export interface SendNotificationByIdsOptions extends RequestOptions {
  body: {
    tenantId: string;
    channelId: string;
    templateId: string;
    variables?: Record<any, any> | null;
    input: Record<any, any>;
  };
  path?: never;
  query?: never;
}
