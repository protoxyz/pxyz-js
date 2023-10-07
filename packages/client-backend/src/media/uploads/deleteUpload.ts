import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type MediaUploadsDeleteUploadResponse = {
    deleted: boolean
}

export function deleteUpload(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<MediaUploadsDeleteUploadResponse> {
    return request<MediaUploadsDeleteUploadResponse>(
        auth,
        'DELETE',
        development ? SERVERS.development : SERVERS.production,
        '/media/uploads/${pathParams.id}',
        options,
    );
}

