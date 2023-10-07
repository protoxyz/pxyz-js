import { request, RequestOptions, AuthOptions } from '../request';
import { SERVERS } from '../servers';

export type TenantsGetSubscriptionResponse = null | {
  id: string;
  stripeId: string;
  customerId: string;
  status: string;
  plan: string;
  collectionMethod: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  meteredUsageAuthUsers: number;
  meteredUsageAuthOrganizations: number;
  meteredUsageMediaUploads: number;
  meteredUsageMediaStorage: number;
  meteredUsageMediaBandwidth: number;
  meteredUsageMediaProcessingTime: number;
  meteredUsageNotifications: number;
  stripeMonthlySubId: string;
  stripeMeteredAuthUsersSubId: string;
  stripeMeteredAuthOrganizationsSubId: string;
  stripeMeteredMediaUploadsSubId: string;
  stripeMeteredMediaStorageSubId: string;
  stripeMeteredMediaBandwidthSubId: string;
  stripeMeteredMediaProcessingTimeSubId: string;
  stripeMeteredNotificationsSubId: string;
  createdAt: string;
  updatedAt: string;
};

export function getSubscription(
  auth: AuthOptions,
  options?: RequestOptions,
  development?: boolean,
): Promise<TenantsGetSubscriptionResponse> {
  return request<TenantsGetSubscriptionResponse>(
    auth,
    'GET',
    development ? SERVERS.development : SERVERS.production,
    '/tenants/${pathParams.id}/subscription',
    options,
  );
}
