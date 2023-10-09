import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthOrganizationsCreateOrganizationResponse = {
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

export function createOrganization(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<AuthOrganizationsCreateOrganizationResponse> {
    return request<AuthOrganizationsCreateOrganizationResponse>(
        auth,
        'POST',
        development ? SERVERS.development : SERVERS.production,
        '/auth/organizations',
        options,
    );
}
