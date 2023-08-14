import { Protocol } from '../../pxyz';
import {
  ListUploadsOptions,
  CreateUploadOptions,
  GetUploadOptions,
  //   UpdateUploadOptions,
  DeleteUploadOptions,
  FinishUploadOptions,
} from '../../requests';
import {
  CreateUpload201Response,
  DeleteUpload200Response,
  GetUpload200Response,
  ListUploads200Response,
} from '../../responses';

export const ListUploadsPath = '/api/v0/uploads';
export const CreateUploadPath = '/api/v0/uploads';
export const GetUploadPath = '/api/v0/uploads/{uploadId}';
// export const UpdateUploadPath = '/api/v0/uploads/{uploadId}';
export const DeleteUploadPath = '/api/v0/uploads/{uploadId}';
export const FinishUploadPath = '/api/v0/uploads/{uploadId}/finish';

export class ProtocolUploadsService {
  private protocol: Protocol;

  constructor(protocol: Protocol) {
    this.protocol = protocol;
  }

  list(options?: ListUploadsOptions): Promise<ListUploads200Response> {
    return this.protocol.client.request<ListUploads200Response>(
      'GET',
      ListUploadsPath,
      options,
    );
  }

  get(options?: GetUploadOptions): Promise<GetUpload200Response> {
    return this.protocol.client.request<GetUpload200Response>(
      'GET',
      GetUploadPath,
      options,
    );
  }

  create(options?: CreateUploadOptions): Promise<CreateUpload201Response> {
    return this.protocol.client.request<CreateUpload201Response>(
      'POST',
      CreateUploadPath,
      options,
    );
  }

  //   update(options?: UpdateUploadOptions): Promise<GetUpload200Response> {
  //     return this.protocol.client.request<GetUpload200Response>(
  //       'PUT',
  //       UpdateUploadPath,
  //       options,
  //     );
  //   }

  delete(options?: DeleteUploadOptions): Promise<DeleteUpload200Response> {
    return this.protocol.client.request<DeleteUpload200Response>(
      'DELETE',
      DeleteUploadPath,
      options,
    );
  }

  finish(options?: FinishUploadOptions): Promise<GetUpload200Response> {
    return this.protocol.client.request<GetUpload200Response>(
      'POST',
      FinishUploadPath,
      options,
    );
  }
}
