import { ResponseStatus, PaginatedMeta } from '@protoxyz/types';

export interface Response {
  status: ResponseStatus;
  error?: string | undefined;
  data?: unknown;
}

export type PaginatedResult<T> = Response & {
  data: T[];
  meta: PaginatedMeta;
  status: ResponseStatus;
};
