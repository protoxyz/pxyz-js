import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type MediaTransformationsUpdateTransformationResponse = {
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
export type MediaTransformationsUpdateTransformationInput = {
    tenantId: string  
    name: string  
    description: string  
    outputFormat: string  
    outputQuality: number  
    outputCompression: number  
    outputWidth: number  
    outputHeight: number  
    outputResizeMode: string  
    steps: {
    type: string  
    options: {
    blurType: string  
    strength: number | null 
} | {
    brightness: number | null 
    hue: number | null 
    saturation: number | null 
    lightness: number | null 
} | {
    top: number | null 
    bottom: number | null 
    left: number | null 
    right: number | null 
    color: string | null 
} | {

} | {

} | {
    url: string  
    x: number | null 
    y: number | null 
    width: number | null 
    height: number | null 
    resizeMode: string | null 
    horizontalAlignment: string | null 
    verticalAlignment: string | null 
    paddingLeft: number | null 
    paddingRight: number | null 
    paddingTop: number | null 
    paddingBottom: number | null 
    repeat: boolean | null 
    opacity: number | null 
    rotation: number | null 
    blendMode: string | null 
} | {
    negativeAlpha: boolean | null 
} | {
    type: string  
    degrees: number | null 
    backgroundColor: string | null 
} | {
    sharpenType: string  
    strength: number | null 
} | {
    text: string  
    color: string | null 
    fontSize: number | null 
    fontWeight: number | null 
    fontStyle: string | null 
    letterSpacing: number | null 
    lineHeight: number | null 
    underline: string | null 
    x: number | null 
    y: number | null 
    width: number | null 
    height: number | null 
    horizontalAlignment: string | null 
    verticalAlignment: string | null 
    justify: string | null 
    paddingTop: number | null 
    paddingBottom: number | null 
    paddingLeft: number | null 
    paddingRight: number | null 
    repeat: boolean | null 
    opacity: number | null 
    rotate: number | null 
    blendMode: string | null 
} | {
    color: string  
    opacity: number | null 
}  
}[]  
};
export function updateTransformation(
    auth: AuthOptions,
    body?: MediaTransformationsUpdateTransformationInput,
    options?: RequestOptions<MediaTransformationsUpdateTransformationInput>,
    development?: boolean,
): Promise<MediaTransformationsUpdateTransformationResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<MediaTransformationsUpdateTransformationInput, MediaTransformationsUpdateTransformationResponse>(
      auth,
      'PATCH',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/media/transformations/${pathParams.id}',
      options,
  );
}

