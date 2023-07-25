import { Environment, SocialProvider } from '.';
import { AuthProperties } from './auth/auth-properties';
import { Domain } from './domain';

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  imageUri: string | null;
  environment: Environment;
  publicKey: string;
  creatorId: string;

  auth?: AuthProperties;

  socialProviders?: SocialProvider[];
  domains?: Domain[];

  createdAt: Date | string;
  updatedAt: Date | string;
}
