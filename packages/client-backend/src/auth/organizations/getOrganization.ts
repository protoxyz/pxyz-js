import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthOrganizationsGetOrganizationResponse = {
    id: string  
    creatorId: string | null 
    tenantId: string | null 
    slug: string  
    name: string  
    imageUri: string | null 
    privateMeta: Record<any, any>  
    publicMeta: Record<any, any>  
    _count: {
    members: number  
}  
    createdAt: string  
    updatedAt: string  
}

export function getOrganization(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<AuthOrganizationsGetOrganizationResponse> {
    return request<AuthOrganizationsGetOrganizationResponse>(
        auth,
        'GET',
        development ? SERVERS.development : SERVERS.production,
        '/auth/organizations/${pathParams.id}',
        options,
    );
}

