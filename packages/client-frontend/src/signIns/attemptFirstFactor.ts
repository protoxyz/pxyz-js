import { request, RequestOptions, AuthOptions } from '../request';
import { SERVERS } from '../servers';

export type SignInsAttemptFirstFactorResponse = {
  status: string;
  error: string;
  data: {
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
      signInAttemptId: string;
      signUpAttemptId: string;
      expiresAt: string;
      createdAt: string;
      updatedAt: string;
    };
    sessionUser: undefined;
    jwt: string;
    authorizeUri: string;
  };
};

export function attemptFirstFactor(
  auth: AuthOptions,
  options?: RequestOptions,
  development?: boolean,
): Promise<SignInsAttemptFirstFactorResponse> {
  return request<SignInsAttemptFirstFactorResponse>(
    auth,
    'POST',
    development ? SERVERS.development : SERVERS.production,
    '/sign-ins/${pathParams.id}/attempt-first-factor',
    options,
  );
}
