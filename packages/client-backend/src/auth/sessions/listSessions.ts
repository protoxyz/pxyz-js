import { request, RequestOptions, AuthOptions } from '../../request';
import { SERVERS } from '../../servers';

export type AuthSessionsListSessionsResponse = {
  status: string;
  data: {
    id: string;
    browser: string;
    device: string;
    engine: string;
    os: string;
    cpu: string;
    ua: string;
    ip: string;
    tenantId: string;
    userId: string;
    user: undefined;
    signInAttemptId: string;
    signInAttempt: {
      id: string;
      tenantId: string;
      userId: string;
      ipAddress: string;
      userAgent: string;
      identifier: string;
      status: string;
      strategy: string;
      oauthProviderId: string;
      oauthProvider: {
        id: string;
        tenantId: string;
        providerKey: string;
        enabled: boolean;
        useCustomCredentials: boolean;
        clientId: string;
        redirectUri: string;
        additionalScopes: undefined;
        createdAt: string;
        updatedAt: string;
      };
      user: undefined;
      createdAt: string;
      updatedAt: string;
    };
    signUpAttemptId: string;
    signUpAttempt: {
      id: string;
      tenantId: string;
      userId: string;
      user: undefined;
      createdAt: string;
      updatedAt: string;
    };
    expiresAt: string;
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

export function listSessions(
  auth: AuthOptions,
  options?: RequestOptions,
  development?: boolean,
): Promise<AuthSessionsListSessionsResponse> {
  return request<AuthSessionsListSessionsResponse>(
    auth,
    'GET',
    development ? SERVERS.development : SERVERS.production,
    '/tenants/${pathParams.tenantId}/auth/sessions',
    options,
  );
}
