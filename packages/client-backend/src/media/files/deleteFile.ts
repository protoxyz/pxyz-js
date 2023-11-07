import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type MediaFilesDeleteFileResponse = boolean
export type MediaFilesDeleteFileInput = undefined;
export function deleteFile(
    auth: AuthOptions,
    body?: MediaFilesDeleteFileInput,
    options?: RequestOptions<MediaFilesDeleteFileInput>,
    development?: boolean,
): Promise<MediaFilesDeleteFileResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<MediaFilesDeleteFileInput, MediaFilesDeleteFileResponse>(
      auth,
      'DELETE',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/files/${pathParams.id}',
      options,
  );
}

