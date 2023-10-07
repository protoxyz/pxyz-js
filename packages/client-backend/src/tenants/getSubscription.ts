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
