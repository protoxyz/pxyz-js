export interface ContentSchema {
  id: string;
  tenantId: string;

  name: string;
  description: string | null;

  types: any;

  createdAt: Date | string;
  updatedAt: Date | string;
}
