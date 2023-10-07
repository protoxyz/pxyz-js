import { request, RequestOptions, AuthOptions } from '../request';
import { SERVERS } from '../servers';

export type SignInsGetSignInResponse = {
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
  };
};

export function getSignIn(
  auth: AuthOptions,
  options?: RequestOptions,
  development?: boolean,
): Promise<SignInsGetSignInResponse> {
  return request<SignInsGetSignInResponse>(
    auth,
    'GET',
    development ? SERVERS.development : SERVERS.production,
    '/sign-ins/${pathParams.id}',
    options,
  );
}
