import { ProtocolBackendClient } from '@/backend/pxyz';
import {
  DeleteFileOptions,
  GetFileOptions,
  ListFilesOptions,
} from './requests';
import {
  DeleteFile200Response,
  GetFile200Response,
  ListFiles200Response,
} from './responses';

export const ListFilesPath = '/v0/tenants/{tenantId}/media/files';
export const GetFilePath = '/v0/media/files/{fileId}';
export const DeleteFilePath = '/v0/media/files/{fileId}';

export class ProtocolMediaFilesService {
  private protocol: ProtocolBackendClient;

  constructor(protocol: ProtocolBackendClient) {
    this.protocol = protocol;
  }

  list(options?: ListFilesOptions): Promise<ListFiles200Response> {
    return this.protocol.client.request<ListFiles200Response>(
      'GET',
      ListFilesPath,
      options,
    );
  }

  get(options?: GetFileOptions): Promise<GetFile200Response> {
    return this.protocol.client.request<GetFile200Response>(
      'GET',
      GetFilePath,
      options,
    );
  }

  delete(options?: DeleteFileOptions): Promise<DeleteFile200Response> {
    return this.protocol.client.request<DeleteFile200Response>(
      'DELETE',
      DeleteFilePath,
      options,
    );
  }
}
