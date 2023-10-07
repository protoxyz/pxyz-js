import { request, RequestOptions, AuthOptions } from '../../request';
import { SERVERS } from '../../servers';

export type MediaFilesDeleteFileResponse = boolean;

export function deleteFile(
  auth: AuthOptions,
  options?: RequestOptions,
  development?: boolean,
): Promise<MediaFilesDeleteFileResponse> {
  return request<MediaFilesDeleteFileResponse>(
    auth,
    'DELETE',
    development ? SERVERS.development : SERVERS.production,
    '/files/${pathParams.id}',
    options,
  );
}
