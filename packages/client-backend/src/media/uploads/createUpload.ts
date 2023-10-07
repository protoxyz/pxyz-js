import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type MediaUploadsCreateUploadResponse = {
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
    uploadUrl: string  
    fields: Record<any, any>  
}

export function createUpload(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<MediaUploadsCreateUploadResponse> {
    return request<MediaUploadsCreateUploadResponse>(
        auth,
        'POST',
        development ? SERVERS.development : SERVERS.production,
        '/media/uploads',
        options,
    );
}

