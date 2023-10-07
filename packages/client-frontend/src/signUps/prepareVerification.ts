import { request, RequestOptions, AuthOptions } from '../request';
import { SERVERS } from '../servers';

export type SignUpsPrepareVerificationResponse = {
  status: string;
  error: string;
  data: {
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
  };
};

export function prepareVerification(
  auth: AuthOptions,
  options?: RequestOptions,
  development?: boolean,
): Promise<SignUpsPrepareVerificationResponse> {
  return request<SignUpsPrepareVerificationResponse>(
    auth,
    'POST',
    development ? SERVERS.development : SERVERS.production,
    '/sign-ups/${pathParams.id}/prepare-verification',
    options,
  );
}
