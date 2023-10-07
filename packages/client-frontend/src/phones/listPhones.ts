import { request, RequestOptions, AuthOptions } from '../request';
import { SERVERS } from '../servers';

export type PhonesListPhonesResponse = {
  status: string;
  error: string;
  data: {
    id: string;
    userId: string;
    phone: string;
    verifiedAt: string;
    createdAt: string;
    updatedAt: string;
  }[];
  meta: {
    total: number;
    count: number;
    numPages: number;
    perPage: number;
    prev: string;
    next: string;
  };
};

export function listPhones(
  auth: AuthOptions,
  options?: RequestOptions,
  development?: boolean,
): Promise<PhonesListPhonesResponse> {
  return request<PhonesListPhonesResponse>(
    auth,
    'GET',
    development ? SERVERS.development : SERVERS.production,
    '/user/phones',
    options,
  );
}
