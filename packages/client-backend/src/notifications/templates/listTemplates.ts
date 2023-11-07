import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type NotificationsTemplatesListTemplatesResponse = {
    status: string  
    data: {
    id: string  
    tenantId: string  
    name: string  
    body: Record<any, any>  
    subject: string | null 
    type: string  
    createdAt: string  
    updatedAt: string  
}[]  
    meta: {
    total: number  
    count: number  
    numPages: number  
    perPage: number  
    prev: string | null 
    next: string | null 
}  
}
export type NotificationsTemplatesListTemplatesInput = undefined;
export function listTemplates(
    auth: AuthOptions,
    body?: NotificationsTemplatesListTemplatesInput,
    options?: RequestOptions<NotificationsTemplatesListTemplatesInput>,
    development?: boolean,
): Promise<NotificationsTemplatesListTemplatesResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<NotificationsTemplatesListTemplatesInput, NotificationsTemplatesListTemplatesResponse>(
      auth,
      'GET',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/tenants/${pathParams.tenantId}/notifications/templates',
      options,
  );
}

