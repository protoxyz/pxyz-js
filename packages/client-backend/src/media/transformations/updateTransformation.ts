import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type MediaTransformationsUpdateTransformationResponse = {
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

export function updateTransformation(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<MediaTransformationsUpdateTransformationResponse> {
    return request<MediaTransformationsUpdateTransformationResponse>(
        auth,
        'PATCH',
        development ? SERVERS.development : SERVERS.production,
        '/media/transformations/${pathParams.id}',
        options,
    );
}

