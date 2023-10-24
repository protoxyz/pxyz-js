export interface ContentDocument {
  id: string;
  tenantId: string;

  schemaId: string;
  schemaName: string;

  name: string;
  description: string | null;

  data: Record<any, any> | null;

  createdAt: Date | string;
  updatedAt: Date | string;
}
