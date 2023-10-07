import { request, RequestOptions, AuthOptions } from '../../request';
import { SERVERS } from '../../servers';

export type NotificationsTemplatesListTemplatesResponse = {
  status: string;
  data: {
    id: string;
    tenantId: string;
    name: string;
    body: undefined;
    subject: string;
    type: string;
    createdAt: string;
    updatedAt: string;
  }[];
  meta: {
    total: number;
    count: number;
    numPages: number;
    perPage: number;
    prev: string;
    next: string;
  };
};

export function listTemplates(
  auth: AuthOptions,
  options?: RequestOptions,
  development?: boolean,
): Promise<NotificationsTemplatesListTemplatesResponse> {
  return request<NotificationsTemplatesListTemplatesResponse>(
    auth,
    'GET',
    development ? SERVERS.development : SERVERS.production,
    '/tenants/${pathParams.tenantId}/notifications/templates',
    options,
  );
}
