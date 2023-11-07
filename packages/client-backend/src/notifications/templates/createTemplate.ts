import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type NotificationsTemplatesCreateTemplateResponse = {
    id: string  
    tenantId: string  
    name: string  
    body: Record<any, any>  
    subject: string | null 
    type: string  
    createdAt: string  
    updatedAt: string  
}
export type NotificationsTemplatesCreateTemplateInput = {
    tenantId: string  
    type: string  
    name: string  
    body: Record<any, any>  
    subject: string | null 
};
export function createTemplate(
    auth: AuthOptions,
    body?: NotificationsTemplatesCreateTemplateInput,
    options?: RequestOptions<NotificationsTemplatesCreateTemplateInput>,
    development?: boolean,
): Promise<NotificationsTemplatesCreateTemplateResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<NotificationsTemplatesCreateTemplateInput, NotificationsTemplatesCreateTemplateResponse>(
      auth,
      'POST',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/notifications/templates',
      options,
  );
}

