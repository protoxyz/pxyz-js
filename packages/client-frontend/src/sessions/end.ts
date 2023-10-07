import { request, RequestOptions, AuthOptions } from '../request';
import { SERVERS } from '../servers';

export type SessionsEndResponse = {
  status: string;
  error: string;
  data: {
    session: {
      id: string;
      browser: string;
      device: string;
      engine: string;
      os: string;
      cpu: string;
      ua: string;
      ip: string;
      userId: string;
      user: undefined;
      signInAttemptId: string;
      signInAttempt: {
        id: string;
        userId: string;
        tenantId: string;
        identifier: string;
        status: string;
        strategy: string;
        oauthProviderId: string;
        oauthProvider: {
          id: string;
          providerKey: string;
        };
        ipAddress: string;
        userAgent: string;
        redirectUri: string;
        createdAt: string;
        updatedAt: string;
      };
      signUpAttemptId: string;
      signUpAttempt: {
        id: string;
        userId: string;
        tenantId: string;
        name: string;
        email: string;
        phone: string;
        username: string;
        status: string;
        oauthProviderId: string;
        oauthProvider: {
          id: string;
          providerKey: string;
        };
        redirectUri: string;
        emailVerificationStrategy: string;
        phoneVerificationStrategy: string;
        requiredFields: string[];
        missingFields: string[];
        requiredVerifications: string[];
        missingVerifications: string[];
        createdAt: string;
        updatedAt: string;
      };
      expiresAt: string;
      createdAt: string;
      updatedAt: string;
    };
  };
};

export function end(
  auth: AuthOptions,
  options?: RequestOptions,
  development?: boolean,
): Promise<SessionsEndResponse> {
  return request<SessionsEndResponse>(
    auth,
    'DELETE',
    development ? SERVERS.development : SERVERS.production,
    '/user/sessions/end',
    options,
  );
}
