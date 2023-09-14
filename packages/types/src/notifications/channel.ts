import { NotificationProvider, NotificationType } from './enums';

export interface NotificationChannel {
  id: string;

  tenantId: string;

  name: string;
  key: string;
  description: string | null;
  provider: NotificationProvider;
  type: NotificationType;
  enabled: boolean;

  providerSettings: Record<any, any> | null;

  createdAt: Date | string;
  updatedAt: Date | string;
}
