import { request, RequestOptions, AuthOptions } from '../../request';
import { SERVERS } from '../../servers';

export type MediaUploadsListUploadsResponse = {
  status: string;
  data: {
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
  }[];
  meta: {
    total: number;
    count: number;
    numPages: number;
    perPage: number;
    prev: string;
    next: string;
  };
};

export function listUploads(
  auth: AuthOptions,
  options?: RequestOptions,
  development?: boolean,
): Promise<MediaUploadsListUploadsResponse> {
  return request<MediaUploadsListUploadsResponse>(
    auth,
    'GET',
    development ? SERVERS.development : SERVERS.production,
    '/tenants/${pathParams.tenantId}/media/uploads',
    options,
  );
}
