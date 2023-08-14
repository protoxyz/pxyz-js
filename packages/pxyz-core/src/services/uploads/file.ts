import { Protocol } from '../../pxyz';
import {
  ListFilesOptions,
  GetFileOptions,
  DeleteFileOptions,
} from '../../requests';
import {
  DeleteFile200Response,
  GetFile200Response,
  ListFiles200Response,
} from '../../responses';

export const ListFilesPath = '/api/files/v0/files';
export const GetFilePath = '/api/files/v0/files/{fileId}';
export const DeleteFilePath = '/api/files/v0/files/{fileId}';

export class ProtocolFilesService {
  private protocol: Protocol;

  constructor(protocol: Protocol) {
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
