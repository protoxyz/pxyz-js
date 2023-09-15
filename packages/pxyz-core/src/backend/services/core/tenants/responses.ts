import { PaginatedResult, Response } from '@/responses';
import { Tenant } from '@protoxyz/types';

export interface ListTenants200Response extends PaginatedResult<Tenant> {}

export interface GetTenant200Response extends Response {
  data: {
    tenant: Tenant | null;
  };
}
