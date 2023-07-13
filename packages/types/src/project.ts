import { Organization } from './auth/organization';

export interface Project {
  id: string;
  organizationId?: string | null | undefined;
  organization?: Organization | null | undefined;
  name: string;
  slug: string;
  imageUri: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}
