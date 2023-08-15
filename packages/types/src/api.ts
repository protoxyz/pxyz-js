export interface PaginatedMeta {
  total: number;
  count: number;
  numPages: number;
  perPage: number;
  prev?: Date | null | undefined;
  next?: Date | null | undefined;
}

export type PaginatedArgs = {
  cursor?: Date | null | undefined;
  perPage?: number;
};

export const ResponseStatus = {
  Success: 'success',
  Error: 'error',
};
export type ResponseStatus =
  (typeof ResponseStatus)[keyof typeof ResponseStatus];
