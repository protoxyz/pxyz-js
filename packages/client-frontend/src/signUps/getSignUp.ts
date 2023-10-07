import { request, RequestOptions, AuthOptions } from '../request';
import { SERVERS } from '../servers';

export type SignUpsGetSignUpResponse = {
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
  };
};

export function getSignUp(
  auth: AuthOptions,
  options?: RequestOptions,
  development?: boolean,
): Promise<SignUpsGetSignUpResponse> {
  return request<SignUpsGetSignUpResponse>(
    auth,
    'GET',
    development ? SERVERS.development : SERVERS.production,
    '/sign-ups/${pathParams.id}',
    options,
  );
}
