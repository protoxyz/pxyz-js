import { request, RequestOptions, AuthOptions } from '../../request';
import { SERVERS } from '../../servers';

export type MediaUploadsGetUploadResponse = {
  id: string;
  tenantId: string;
  path: string;
  originalFilename: string;
  mime: string;
  size: number;
  meta: undefined;
  finishedAt: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

export function getUpload(
  auth: AuthOptions,
  options?: RequestOptions,
  development?: boolean,
): Promise<MediaUploadsGetUploadResponse> {
  return request<MediaUploadsGetUploadResponse>(
    auth,
    'GET',
    development ? SERVERS.development : SERVERS.production,
    '/media/uploads/${pathParams.id}',
    options,
  );
}
