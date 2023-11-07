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
export type MediaUploadsGetUploadInput = undefined;
export function getUpload(
    auth: AuthOptions,
    body?: MediaUploadsGetUploadInput,
    options?: RequestOptions<MediaUploadsGetUploadInput>,
    development?: boolean,
): Promise<MediaUploadsGetUploadResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<MediaUploadsGetUploadInput, MediaUploadsGetUploadResponse>(
      auth,
      'GET',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/media/uploads/${pathParams.id}',
      options,
  );
}

