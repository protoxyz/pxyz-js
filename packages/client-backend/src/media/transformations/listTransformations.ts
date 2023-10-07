import { request, RequestOptions, AuthOptions } from '../../request';
import { SERVERS } from '../../servers';

export type MediaTransformationsListTransformationsResponse = {
  status: string;
  data: {
    id: string;
    tenantId: string;
    name: string;
    description: string;
    outputFormat: string;
    outputQuality: number;
    outputCompression: number;
    outputWidth: number;
    outputHeight: number;
    outputResizeMode: string;
    steps: {
      type: string;
      options: undefined;
    }[];
    createdAt: string;
    updatedAt: string;
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

export function listTransformations(
  auth: AuthOptions,
  options?: RequestOptions,
  development?: boolean,
): Promise<MediaTransformationsListTransformationsResponse> {
  return request<MediaTransformationsListTransformationsResponse>(
    auth,
    'GET',
    development ? SERVERS.development : SERVERS.production,
    '/tenants/${pathParams.tenantId}/media/transformations',
    options,
  );
}
