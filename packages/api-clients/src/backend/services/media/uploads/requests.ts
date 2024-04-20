import { RequestOptions } from '@/client';

export interface ListUploadsOptions extends RequestOptions {
  body?: never;
  path?: never;
  query?: {
    cursor?: string | undefined;
    perPage?: string;
  };
}

export interface GetUploadOptions extends RequestOptions {
  body?: never;
  path?: {
    uploadId: string;
  };
  query?: never;
}

export interface CreateUploadOptions extends RequestOptions {
  body: {
    tenantId: string;
    path: string;
    access: 'public' | 'private';
    originalFilename: string;
    mime: string;
    size: number;
    meta?: Record<string, any>;
    duration?: number;
    width?: number;
    height?: number;
  };
  path?: never;
  query?: never;
}

export interface DeleteUploadOptions extends RequestOptions {
  body?: never;
  path: {
    uploadId: string;
  };
  query?: never;
}

export interface FinishUploadOptions extends RequestOptions {
  body: {
    code: string;
  };
  path: {
    uploadId: string;
  };
  query?: never;
}
