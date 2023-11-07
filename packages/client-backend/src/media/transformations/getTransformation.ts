import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type MediaTransformationsGetTransformationResponse = {
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
}
export type MediaTransformationsGetTransformationInput = undefined;
export function getTransformation(
    auth: AuthOptions,
    body?: MediaTransformationsGetTransformationInput,
    options?: RequestOptions<MediaTransformationsGetTransformationInput>,
    development?: boolean,
): Promise<MediaTransformationsGetTransformationResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<MediaTransformationsGetTransformationInput, MediaTransformationsGetTransformationResponse>(
      auth,
      'GET',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/media/transformations/${pathParams.id}',
      options,
  );
}

