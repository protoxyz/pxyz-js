import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type MediaFilesGetFileResponse = {
    id: string
    tenantId: string
    originalFilename: string
    path: string
    description: string
    mime: string
    size: number
    width: number
    height: number
    duration: number
    transformationId: string
    meta: undefined
    createdAt: string
    updatedAt: string
    deletedAt: string
}

export function getFile(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<MediaFilesGetFileResponse> {
    return request<MediaFilesGetFileResponse>(
        auth,
        'GET',
        development ? SERVERS.development : SERVERS.production,
        '/media/files/${pathParams.id}',
        options,
    );
}

