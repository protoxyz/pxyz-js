import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type NotificationsTemplatesDeleteTemplateResponse = {
    deleted: boolean  
}
export type NotificationsTemplatesDeleteTemplateInput = undefined;
export function deleteTemplate(
    auth: AuthOptions,
    body?: NotificationsTemplatesDeleteTemplateInput,
    options?: RequestOptions<NotificationsTemplatesDeleteTemplateInput>,
    development?: boolean,
): Promise<NotificationsTemplatesDeleteTemplateResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<NotificationsTemplatesDeleteTemplateInput, NotificationsTemplatesDeleteTemplateResponse>(
      auth,
      'DELETE',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/notifications/templates/${pathParams.id}',
      options,
  );
}

