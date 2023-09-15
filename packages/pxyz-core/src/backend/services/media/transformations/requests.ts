import { RequestOptions } from '@/client';
import { Transformation } from '@protoxyz/types';

export interface ListTransformationsOptions extends RequestOptions {
  body?: never;
  path?: never;
  query?: {
    cursor?: string | undefined;
    perPage?: string;
  };
}

export interface GetTransformationOptions extends RequestOptions {
  body?: never;
  path?: {
    transformationId: string;
  };
  query?: never;
}

export interface TransformationStep {}

export interface CreateTransformationOptions extends RequestOptions {
  body: Exclude<Transformation, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>;
  path?: never;
  query?: never;
}

export interface UpdateTransformationOptions extends RequestOptions {
  body: Exclude<
    Transformation,
    'id' | 'tenantId' | 'createdAt' | 'updatedAt' | 'deletedAt'
  >;
  path?: never;
  query?: never;
}

export interface DeleteTransformationOptions extends RequestOptions {
  body?: never;
  path: {
    transformationId: string;
  };
  query?: never;
}
