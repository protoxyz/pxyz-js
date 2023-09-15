import { RequestOptions } from '@/client';

export interface ListFilesOptions extends RequestOptions {
  body?: never;
  path?: never;
  query?: {
    cursor?: string | undefined;
    perPage?: string;
  };
}

export interface GetFileOptions extends RequestOptions {
  body?: never;
  path?: {
    fileId: string;
  };
  query?: never;
}

export interface DeleteFileOptions extends RequestOptions {
  body?: never;
  path: {
    fileId: string;
  };
  query?: never;
}
