import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type MediaTransformationsGetTransformationResponse = {
    id: string
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
    options: undefined
}[]
    createdAt: string
    updatedAt: string
}

export function getTransformation(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<MediaTransformationsGetTransformationResponse> {
    return request<MediaTransformationsGetTransformationResponse>(
        auth,
        'GET',
        development ? SERVERS.development : SERVERS.production,
        '/media/transformations/${pathParams.id}',
        options,
    );
}

