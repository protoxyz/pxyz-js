import { request, RequestOptions, AuthOptions } from '../request';
import { SERVERS } from '../servers';

export type UserProfileResponse = {
  status: string;
  error: string;
  data: {
    user: {
      id: string;
      name: string;
      username: string;
      imageUri: string;
      lastSignInAt: string;
      lastActiveAt: string;
      status: string;
      roleId: string;
      role: {
        id: string;
        name: string;
        description: string;
        permissions: string[];
      };
      primaryEmailId: string;
      primaryPhoneId: string;
      emailAddresses: {
        id: string;
        email: string;
        verifiedAt: string;
        createdAt: string;
      }[];
      phoneNumbers: {
        id: string;
        phone: string;
        verifiedAt: string;
        createdAt: string;
      }[];
      connections: {
        id: string;
        status: string;
        socialProviderId: string;
        socialProvider: {
          providerKey: string;
        };
        providerId: string;
        scope: string;
        createdAt: string;
        updatedAt: string;
      }[];
      organizations: {
        id: string;
        name: string;
        slug: string;
        creatorId: string;
        description: string;
        logoUri: string;
        iconUri: string;
        membership: {
          id: string;
          publicMeta: undefined;
          roleId: string;
          role: {
            name: string;
            description: string;
            permissions: string[];
          };
        };
        createdAt: string;
        updatedAt: string;
      }[];
      publicMeta: undefined;
      timezone: string;
      locale: string;
      createdAt: string;
      updatedAt: string;
    };
  };
};

export function profile(
  auth: AuthOptions,
  options?: RequestOptions,
  development?: boolean,
): Promise<UserProfileResponse> {
  return request<UserProfileResponse>(
    auth,
    'GET',
    development ? SERVERS.development : SERVERS.production,
    '/user/profile',
    options,
  );
}
