import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type MediaTransformationsListTransformationsResponse = {
    status: string  
    data: {
    id: string  
    tenantId: string  
    name: string  
    description: string | null 
    outputFormat: string  
    outputQuality: number  
    outputCompression: number  
    outputWidth: number  
    outputHeight: number  
    outputResizeMode: string  
    steps: Record<any, any>  
    createdAt: string  
    updatedAt: string  
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
export type MediaTransformationsListTransformationsInput = undefined;
export function listTransformations(
    auth: AuthOptions,
    body?: MediaTransformationsListTransformationsInput,
    options?: RequestOptions<MediaTransformationsListTransformationsInput>,
    development?: boolean,
): Promise<MediaTransformationsListTransformationsResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<MediaTransformationsListTransformationsInput, MediaTransformationsListTransformationsResponse>(
      auth,
      'GET',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/tenants/${pathParams.tenantId}/media/transformations',
      options,
  );
}

