import { PaginatedResult, Response } from '@/responses';
import { NotificationTemplate } from '@protoxyz/types';

export type ListNotificationTemplates200Response =
  PaginatedResult<NotificationTemplate>;
export interface GetNotificationTemplate200Response extends Response {
  data: NotificationTemplate;
}

export interface CreateNotificationTemplate201Response extends Response {
  data: NotificationTemplate;
}

export interface UpdateNotificationTemplate200Response extends Response {
  data: NotificationTemplate;
}
export interface DeleteNotificationTemplate200Response extends Response {
  data: NotificationTemplate;
}
export interface FinishNotificationTemplate200Response extends Response {
  data: NotificationTemplate;
}
