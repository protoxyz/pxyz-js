import { request, RequestOptions, AuthOptions } from '../../request';
import { SERVERS } from '../../servers';

export type NotificationsNotificationSendResponse = {
  status: string;
};

export function send(
  auth: AuthOptions,
  options?: RequestOptions,
  development?: boolean,
): Promise<NotificationsNotificationSendResponse> {
  return request<NotificationsNotificationSendResponse>(
    auth,
    'POST',
    development ? SERVERS.development : SERVERS.production,
    '/notifications/send',
    options,
  );
}
