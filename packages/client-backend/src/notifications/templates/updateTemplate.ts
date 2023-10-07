import { request, RequestOptions, AuthOptions } from '../../request';
import { SERVERS } from '../../servers';

export type NotificationsTemplatesUpdateTemplateResponse = {
  id: string;
  tenantId: string;
  name: string;
  body: undefined;
  subject: string;
  type: string;
  createdAt: string;
  updatedAt: string;
};

export function updateTemplate(
  auth: AuthOptions,
  options?: RequestOptions,
  development?: boolean,
): Promise<NotificationsTemplatesUpdateTemplateResponse> {
  return request<NotificationsTemplatesUpdateTemplateResponse>(
    auth,
    'PUT',
    development ? SERVERS.development : SERVERS.production,
    '/notifications/templates/${pathParams.id}',
    options,
  );
}
