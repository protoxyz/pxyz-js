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
export type MediaFilesGetFileInput = undefined;
export function getFile(
    auth: AuthOptions,
    body?: MediaFilesGetFileInput,
    options?: RequestOptions<MediaFilesGetFileInput>,
    development?: boolean,
): Promise<MediaFilesGetFileResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<MediaFilesGetFileInput, MediaFilesGetFileResponse>(
      auth,
      'GET',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/media/files/${pathParams.id}',
      options,
  );
}

