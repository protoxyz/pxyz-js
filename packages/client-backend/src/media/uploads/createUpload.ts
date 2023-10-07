import { request, RequestOptions, AuthOptions } from '../../request';
import { SERVERS } from '../../servers';

export type MediaUploadsCreateUploadResponse = {
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
  uploadUrl: string;
  fields: undefined;
};

export function createUpload(
  auth: AuthOptions,
  options?: RequestOptions,
  development?: boolean,
): Promise<MediaUploadsCreateUploadResponse> {
  return request<MediaUploadsCreateUploadResponse>(
    auth,
    'POST',
    development ? SERVERS.development : SERVERS.production,
    '/media/uploads',
    options,
  );
}
