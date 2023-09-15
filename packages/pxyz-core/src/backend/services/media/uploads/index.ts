import { ProtocolBackendClient } from '@/backend/pxyz';
import {
  CreateUploadOptions,
  DeleteUploadOptions,
  FinishUploadOptions,
  GetUploadOptions,
  ListUploadsOptions,
} from './requests';
import {
  CreateUpload201Response,
  DeleteUpload200Response,
  GetUpload200Response,
  ListUploads200Response,
} from './responses';

export const ListUploadsPath = '/api/v0/tenants/{tenantId}/media/uploads';
export const CreateUploadPath = '/api/v0/media/uploads';
export const GetUploadPath = '/api/v0/media/uploads/{uploadId}';
export const DeleteUploadPath = '/api/v0/uploads/{uploadId}';
export const FinishUploadPath = '/api/v0/uploads/{uploadId}/finish';

export class ProtocolMediaUploadsService {
  private protocol: ProtocolBackendClient;

  constructor(protocol: ProtocolBackendClient) {
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
