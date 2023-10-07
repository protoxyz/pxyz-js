import { request, RequestOptions, AuthOptions } from '../../request';
import { SERVERS } from '../../servers';

export type MediaTransformationsDeleteTransformationResponse = boolean;

export function deleteTransformation(
  auth: AuthOptions,
  options?: RequestOptions,
  development?: boolean,
): Promise<MediaTransformationsDeleteTransformationResponse> {
  return request<MediaTransformationsDeleteTransformationResponse>(
    auth,
    'DELETE',
    development ? SERVERS.development : SERVERS.production,
    '/media/transformations/${pathParams.id}',
    options,
  );
}
