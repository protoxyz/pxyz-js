import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type NotificationsTemplatesGetTemplateResponse = {
    id: string  
    tenantId: string  
    name: string  
    body: Record<any, any>  
    subject: string | null 
    type: string  
    createdAt: string  
    updatedAt: string  
}
export type NotificationsTemplatesGetTemplateInput = undefined;
export function getTemplate(
    auth: AuthOptions,
    body?: NotificationsTemplatesGetTemplateInput,
    options?: RequestOptions<NotificationsTemplatesGetTemplateInput>,
    development?: boolean,
): Promise<NotificationsTemplatesGetTemplateResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<NotificationsTemplatesGetTemplateInput, NotificationsTemplatesGetTemplateResponse>(
      auth,
      'GET',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/notifications/templates/${pathParams.id}',
      options,
  );
}

