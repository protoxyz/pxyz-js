import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type NotificationsTemplatesUpdateContentResponse = Record<any, any>
export type NotificationsTemplatesUpdateContentInput = {
    assets: Record<any, any>[]  
    pages: Record<any, any>[]  
    styles: Record<any, any>[]  
};
export function updateContent(
    auth: AuthOptions,
    body?: NotificationsTemplatesUpdateContentInput,
    options?: RequestOptions<NotificationsTemplatesUpdateContentInput>,
    development?: boolean,
): Promise<NotificationsTemplatesUpdateContentResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<NotificationsTemplatesUpdateContentInput, NotificationsTemplatesUpdateContentResponse>(
      auth,
      'PUT',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/notifications/templates/${pathParams.id}/content',
      options,
  );
}

