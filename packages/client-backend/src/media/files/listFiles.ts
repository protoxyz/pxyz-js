import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type MediaFilesListFilesResponse = {
    status: string  
    data: {
    id: string  
    tenantId: string  
    originalFilename: string | null 
    path: string  
    description: string | null 
    mime: string | null 
    size: number | null 
    width: number | null 
    height: number | null 
    duration: number | null 
    transformationId: string | null 
    meta: Record<any, any>  
    createdAt: string  
    updatedAt: string  
    deletedAt: string | null 
}[]  
    meta: {
    total: number  
    count: number  
    numPages: number  
    perPage: number  
    prev: string | null 
    next: string | null 
}  
}

export function listFiles(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<MediaFilesListFilesResponse> {
    return request<MediaFilesListFilesResponse>(
        auth,
        'GET',
        development ? SERVERS.development : SERVERS.production,
        '/tenants/${pathParams.tenantId}/media/files',
        options,
    );
}

