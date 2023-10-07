import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type MediaUploadsGetUploadResponse = {
    id: string  
    tenantId: string  
    path: string | null 
    originalFilename: string | null 
    mime: string | null 
    size: number | null 
    meta: Record<any, any>  
    finishedAt: string | null 
    createdAt: string  
    updatedAt: string  
    deletedAt: string | null 
}

export function getUpload(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<MediaUploadsGetUploadResponse> {
    return request<MediaUploadsGetUploadResponse>(
        auth,
        'GET',
        development ? SERVERS.development : SERVERS.production,
        '/media/uploads/${pathParams.id}',
        options,
    );
}

