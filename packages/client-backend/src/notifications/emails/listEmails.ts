import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type NotificationsEmailsListEmailsResponse = {
    status: string  
    data: any[]  
}
export type NotificationsEmailsListEmailsInput = undefined;
export function listEmails(
    auth: AuthOptions,
    body?: NotificationsEmailsListEmailsInput,
    options?: RequestOptions<NotificationsEmailsListEmailsInput>,
    development?: boolean,
): Promise<NotificationsEmailsListEmailsResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<NotificationsEmailsListEmailsInput, NotificationsEmailsListEmailsResponse>(
      auth,
      'GET',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/tenants/${pathParams.tenantId}/notifications/emails',
      options,
  );
}

