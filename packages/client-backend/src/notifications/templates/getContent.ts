import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type NotificationsTemplatesGetContentResponse = Record<any, any>
export type NotificationsTemplatesGetContentInput = undefined;
export function getContent(
    auth: AuthOptions,
    body?: NotificationsTemplatesGetContentInput,
    options?: RequestOptions<NotificationsTemplatesGetContentInput>,
    development?: boolean,
): Promise<NotificationsTemplatesGetContentResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<NotificationsTemplatesGetContentInput, NotificationsTemplatesGetContentResponse>(
      auth,
      'GET',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/notifications/templates/${pathParams.id}/content',
      options,
  );
}

