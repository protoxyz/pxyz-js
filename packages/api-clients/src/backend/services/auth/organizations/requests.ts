import { RequestOptions } from '@/client';

export interface ListOrganizationsOptions extends RequestOptions {
  body?: never;
  path?: never;
  query?: {
    cursor?: string | undefined;
    perPage?: string;
  };
}

export interface GetOrganizationOptions extends RequestOptions {
  body?: never;
  path?: {
    organizationId: string;
  };
  query?: never;
}

export interface CreateOrganizationOptions extends RequestOptions {
  body: {
    tenantId: string;
    name: string;
    slug?: string;
    publicMeta?: Record<any, any>;
    privateMeta?: Record<any, any>;
  };
  path?: never;
  query?: never;
}

export interface UpdateOrganizationOptions extends RequestOptions {
  body: {
    name?: string;
    slug?: string;
    publicMeta?: Record<any, any>;
    privateMeta?: Record<any, any>;
  };
  path: {
    organizationId: string;
  };
  query?: never;
}

export interface DeleteOrganizationOptions extends RequestOptions {
  body?: never;
  path: {
    organizationId: string;
  };
  query?: never;
}
