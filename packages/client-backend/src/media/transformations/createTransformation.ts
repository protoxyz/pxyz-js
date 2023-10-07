import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type MediaTransformationsCreateTransformationResponse = {
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
    createdAt: string  
    updatedAt: string  
}

export function createTransformation(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<MediaTransformationsCreateTransformationResponse> {
    return request<MediaTransformationsCreateTransformationResponse>(
        auth,
        'POST',
        development ? SERVERS.development : SERVERS.production,
        '/media/transformations',
        options,
    );
}

