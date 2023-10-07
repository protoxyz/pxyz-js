import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type MediaFilesGetFileResponse = {
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
}

export function getFile(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<MediaFilesGetFileResponse> {
    return request<MediaFilesGetFileResponse>(
        auth,
        'GET',
        development ? SERVERS.development : SERVERS.production,
        '/media/files/${pathParams.id}',
        options,
    );
}

