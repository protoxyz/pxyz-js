import { PaginatedResult, Response } from '@/responses';
import { Organization } from '@protoxyz/types';

export type ListOrganizations200Response = PaginatedResult<Organization>;
export interface GetOrganization200Response extends Response {
  data: Organization;
}

export interface CreateOrganization201Response extends Response {
  data: Organization;
}

export interface UpdateOrganization200Response extends Response {
  data: Organization;
}
export interface DeleteOrganization200Response extends Response {
  data: Organization;
}
