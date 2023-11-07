import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type NotificationsTemplatesUpdateTemplateResponse = {
    id: string  
    tenantId: string  
    name: string  
    body: Record<any, any>  
    subject: string | null 
    type: string  
    createdAt: string  
    updatedAt: string  
}
export type NotificationsTemplatesUpdateTemplateInput = {
    name: string  
    body: string  
    subject: string | null 
};
export function updateTemplate(
    auth: AuthOptions,
    body?: NotificationsTemplatesUpdateTemplateInput,
    options?: RequestOptions<NotificationsTemplatesUpdateTemplateInput>,
    development?: boolean,
): Promise<NotificationsTemplatesUpdateTemplateResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<NotificationsTemplatesUpdateTemplateInput, NotificationsTemplatesUpdateTemplateResponse>(
      auth,
      'PUT',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/notifications/templates/${pathParams.id}',
      options,
  );
}

