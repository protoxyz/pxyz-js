import { NotificationType } from './enums';

export interface NotificationTemplate {
  id: string;

  tenantId: string;

  type: NotificationType;

  name: string;
  body: Record<any, any>;

  createdAt: Date | string;
  updatedAt: Date | string;
}
