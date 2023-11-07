import { request, RequestOptions, AuthOptions } from "../request";
import { SERVERS } from "../servers";

export type TenantsGetSubscriptionResponse = null | {
    id: string  
    stripeId: string  
    customerId: string  
    status: string  
    plan: string  
    collectionMethod: string  
    currentPeriodStart: string  
    currentPeriodEnd: string  
    meteredUsageAuthUsers: number  
    meteredUsageAuthOrganizations: number  
    meteredUsageMediaUploads: number  
    meteredUsageMediaStorage: number  
    meteredUsageMediaBandwidth: number  
    meteredUsageMediaProcessingTime: number  
    meteredUsageNotifications: number  
    stripeMonthlySubId: string | null 
    stripeMeteredAuthUsersSubId: string | null 
    stripeMeteredAuthOrganizationsSubId: string | null 
    stripeMeteredMediaUploadsSubId: string | null 
    stripeMeteredMediaStorageSubId: string | null 
    stripeMeteredMediaBandwidthSubId: string | null 
    stripeMeteredMediaProcessingTimeSubId: string | null 
    stripeMeteredNotificationsSubId: string | null 
    createdAt: string  
    updatedAt: string  
}

export type TenantsGetSubscriptionInput = undefined;

export function getSubscription(
    auth: AuthOptions,
    body?: TenantsGetSubscriptionInput,
    options?: RequestOptions<TenantsGetSubscriptionInput>,
    development?: boolean,
): Promise<TenantsGetSubscriptionResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
    return request<TenantsGetSubscriptionInput, TenantsGetSubscriptionResponse>(
        auth,
        'GET',
        isDevelopment ? SERVERS.development : SERVERS.production,
        '/tenants/${pathParams.id}/subscription',
        {...options, body},
    );
}
