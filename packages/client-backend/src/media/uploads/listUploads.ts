import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type MediaUploadsListUploadsResponse = {
    status: string  
    data: {
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
export type MediaUploadsListUploadsInput = undefined;
export function listUploads(
    auth: AuthOptions,
    body?: MediaUploadsListUploadsInput,
    options?: RequestOptions<MediaUploadsListUploadsInput>,
    development?: boolean,
): Promise<MediaUploadsListUploadsResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<MediaUploadsListUploadsInput, MediaUploadsListUploadsResponse>(
      auth,
      'GET',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/tenants/${pathParams.tenantId}/media/uploads',
      options,
  );
}

