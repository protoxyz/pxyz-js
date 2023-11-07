import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type MediaUploadsDeleteUploadResponse = {
    deleted: boolean  
}
export type MediaUploadsDeleteUploadInput = undefined;
export function deleteUpload(
    auth: AuthOptions,
    body?: MediaUploadsDeleteUploadInput,
    options?: RequestOptions<MediaUploadsDeleteUploadInput>,
    development?: boolean,
): Promise<MediaUploadsDeleteUploadResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<MediaUploadsDeleteUploadInput, MediaUploadsDeleteUploadResponse>(
      auth,
      'DELETE',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/media/uploads/${pathParams.id}',
      options,
  );
}

