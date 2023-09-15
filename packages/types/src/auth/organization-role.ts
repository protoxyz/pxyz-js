export interface OrganizationRole {
  id: string;
  name: string;
  slug: string;
  description: string | undefined;
  permisssions: string[];
  createdAt: Date | string;
  updatedAt: Date | string;
}
