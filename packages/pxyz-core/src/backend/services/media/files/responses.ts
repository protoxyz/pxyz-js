import { PaginatedResult } from '@/responses';

export type ListFiles200Response = PaginatedResult<File>;
export interface GetFile200Response extends Response {
  data: File;
}

export interface CreateFile201Response extends Response {
  data: File;
}

export interface UpdateFile200Response extends Response {
  data: File;
}
export interface DeleteFile200Response extends Response {
  data: File;
}
