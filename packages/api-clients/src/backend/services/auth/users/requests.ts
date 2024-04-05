import { RequestOptions } from '@/client';

export interface ListUsersOptions extends RequestOptions {
  body?: never;
  path?: never;
  query?: {
    cursor?: string | undefined;
    perPage?: string;
  };
}

export interface GetUserOptions extends RequestOptions {
  body?: never;
  path?: {
    userId: string;
  };
  query?: never;
}

export interface CreateUserOptions extends RequestOptions {
  body: {
    tenantId: string;
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    locale?: string;
    birthdate?: Date;
  };
  path?: never;
  query?: never;
}

export interface UpdateUserOptions extends RequestOptions {
  body: {
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    locale?: string;
    birthdate?: Date;
  };
  path: {
    userId: string;
  };
  query?: never;
}

export interface DeleteUserOptions extends RequestOptions {
  body?: never;
  path: {
    userId: string;
  };
  query?: never;
}
