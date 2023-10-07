import { request, RequestOptions, AuthOptions } from '../request';
import { SERVERS } from '../servers';

export type DomainsListDomainsResponse = {
  id: string;
  tenantId: string;
  name: string;
  primary: boolean;
  type: string;
  verified: boolean;
  verificationRecordType: string;
  verificationRecordDomain: string;
  verificationRecordValue: string;
  verificationRecordReason: string;
  createdAt: string;
  updatedAt: string;
}[];

export function listDomains(
  auth: AuthOptions,
  options?: RequestOptions,
  development?: boolean,
): Promise<DomainsListDomainsResponse> {
  return request<DomainsListDomainsResponse>(
    auth,
    'GET',
    development ? SERVERS.development : SERVERS.production,
    '/domains',
    options,
  );
}
