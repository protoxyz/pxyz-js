import { request, RequestOptions, AuthOptions } from '../../request';
import { SERVERS } from '../../servers';

export type MediaFilesListFilesResponse = {
  status: string;
  data: {
    id: string;
    tenantId: string;
    originalFilename: string;
    path: string;
    description: string;
    mime: string;
    size: number;
    width: number;
    height: number;
    duration: number;
    transformationId: string;
    meta: undefined;
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

export function listFiles(
  auth: AuthOptions,
  options?: RequestOptions,
  development?: boolean,
): Promise<MediaFilesListFilesResponse> {
  return request<MediaFilesListFilesResponse>(
    auth,
    'GET',
    development ? SERVERS.development : SERVERS.production,
    '/tenants/${pathParams.tenantId}/media/files',
    options,
  );
}
