import { Environment, Tenant } from '@protoxyz/types';
import { RequestOptions } from '../../../../client';

export interface ListTenantsOptions extends RequestOptions {
  body?: never;
  path?: never;
  query?: {
    cursor?: string | undefined;
    perPage?: string;
  };
}

export interface GetTenantByIdOptions extends RequestOptions {
  body?: never;
  path: {
    tenantId: string;
  };
  query?: never;
}

export interface GetTenantBySlugOptions extends RequestOptions {
  body?: never;
  path: {
    slug: string;
  };
  query?: never;
}

export interface GetTenantByDomainOptions extends RequestOptions {
  body?: never;
  path: {
    domain: string;
  };
  query?: never;
}

export interface CreateTenantOptions extends RequestOptions {
  body: {
    name: string;
    environment: Environment;
    slug?: string | undefined;
  };
  path?: never;
  query?: never;
}

export interface UpdateTenantOptions extends RequestOptions {
  body: {
    name?: string | undefined;
    slug?: string | undefined;
    logoId?: string | undefined;
    iconId?: string | undefined;
    environment?: Environment | undefined;
  };
  path: {
    tenantId: string;
  };
  query?: never;
}
