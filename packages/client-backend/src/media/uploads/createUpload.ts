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
export type MediaUploadsCreateUploadInput = {
    tenantId: string  
    path: string  
    access: string  
    originalFilename: string | null 
    mime: string  
    size: number  
    meta: Record<any, any>  
};
export function createUpload(
    auth: AuthOptions,
    body?: MediaUploadsCreateUploadInput,
    options?: RequestOptions<MediaUploadsCreateUploadInput>,
    development?: boolean,
): Promise<MediaUploadsCreateUploadResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<MediaUploadsCreateUploadInput, MediaUploadsCreateUploadResponse>(
      auth,
      'POST',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/media/uploads',
      options,
  );
}

