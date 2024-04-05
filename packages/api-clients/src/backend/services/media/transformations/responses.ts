import { PaginatedResult, Response } from '@/responses';
import { Transformation } from '@protoxyz/types';

export type ListTransformations200Response = PaginatedResult<Transformation>;
export interface GetTransformation200Response extends Response {
  data: {
    transformation: Transformation;
  };
}

export interface CreateTransformation201Response extends Response {
  data: {
    transformation: Transformation;
  };
}

export interface UpdateTransformation200Response extends Response {
  data: {
    transformation: Transformation;
  };
}
export interface DeleteTransformation200Response extends Response {
  data: {
    transformation: Transformation;
  };
}
