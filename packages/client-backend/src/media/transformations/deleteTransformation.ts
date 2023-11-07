import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type MediaTransformationsDeleteTransformationResponse = boolean
export type MediaTransformationsDeleteTransformationInput = undefined;
export function deleteTransformation(
    auth: AuthOptions,
    body?: MediaTransformationsDeleteTransformationInput,
    options?: RequestOptions<MediaTransformationsDeleteTransformationInput>,
    development?: boolean,
): Promise<MediaTransformationsDeleteTransformationResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<MediaTransformationsDeleteTransformationInput, MediaTransformationsDeleteTransformationResponse>(
      auth,
      'DELETE',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/media/transformations/${pathParams.id}',
      options,
  );
}

