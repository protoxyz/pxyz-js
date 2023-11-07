import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type NotificationsTemplatesTestResponse = unknown
export type NotificationsTemplatesTestInput = {
    templateId: string  
    channelId: string  
    variables: string  
    input: Record<any, any>  
};
export function test(
    auth: AuthOptions,
    body?: NotificationsTemplatesTestInput,
    options?: RequestOptions<NotificationsTemplatesTestInput>,
    development?: boolean,
): Promise<NotificationsTemplatesTestResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<NotificationsTemplatesTestInput, NotificationsTemplatesTestResponse>(
      auth,
      'POST',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/notifications/test',
      options,
  );
}

