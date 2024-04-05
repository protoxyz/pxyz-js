import { PaginatedResult, Response } from '@/responses';
import { NotificationChannel } from '@protoxyz/types';

export type ListNotificationChannels200Response =
  PaginatedResult<NotificationChannel>;
export interface GetNotificationChannel200Response extends Response {
  data: NotificationChannel;
}

export interface CreateNotificationChannel201Response extends Response {
  data: NotificationChannel;
}

export interface UpdateNotificationChannel200Response extends Response {
  data: NotificationChannel;
}
export interface DeleteNotificationChannel200Response extends Response {
  data: NotificationChannel;
}
export interface FinishNotificationChannel200Response extends Response {
  data: NotificationChannel;
}
