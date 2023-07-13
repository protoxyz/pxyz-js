import { Organization } from './auth/organization';
import { StackRepository } from './platform/stack-repository';

export interface StarterKit {
  id: string;

  organizationId?: string | null;
  organization?: Organization | null;

  name: string;
  slug: string;
  description?: string | null;
  imageUri?: string | null;
  repositoryUri: string;
  status: StarterKitStatus;
  protocolServices: string[];
  repositories?: StackRepository[] | null | undefined;

  createdAt: Date;
  updatedAt: Date;
}

export const StarterKitStatus = {
  created: 'created',
  featured: 'featured',
  public: 'public',
};
export type StarterKitStatus =
  (typeof StarterKitStatus)[keyof typeof StarterKitStatus];
