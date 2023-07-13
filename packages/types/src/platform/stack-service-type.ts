export const StackServiceType = {
  web_server: 'web_server',
  static_site: 'static_site',
  background_worker: 'background_worker',
  cron_job: 'cron_job',
  private_service: 'private_service',
};
export type StackServiceType =
  (typeof StackServiceType)[keyof typeof StackServiceType];
