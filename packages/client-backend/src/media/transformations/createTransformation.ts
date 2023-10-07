import { request, RequestOptions, AuthOptions } from '../../request';
import { SERVERS } from '../../servers';

export type MediaTransformationsCreateTransformationResponse = {
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
};

export function createTransformation(
  auth: AuthOptions,
  options?: RequestOptions,
  development?: boolean,
): Promise<MediaTransformationsCreateTransformationResponse> {
  return request<MediaTransformationsCreateTransformationResponse>(
    auth,
    'POST',
    development ? SERVERS.development : SERVERS.production,
    '/media/transformations',
    options,
  );
}
