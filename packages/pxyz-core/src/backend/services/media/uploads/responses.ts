import { PaginatedResult, Response } from '@/responses';
import { Upload } from '@protoxyz/types';

export type ListUploads200Response = PaginatedResult<Upload>;
export interface GetUpload200Response extends Response {
  data: Upload;
}

export interface CreateUpload201Response extends Response {
  data: Upload;
}

export interface UpdateUpload200Response extends Response {
  data: Upload;
}
export interface DeleteUpload200Response extends Response {
  data: Upload;
}
export interface FinishUpload200Response extends Response {
  data: Upload;
}
