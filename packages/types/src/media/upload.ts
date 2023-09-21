export interface Upload {
  id: string;

  tenantId: string;
  path: string;
  folder: string | null;
  originalFilename: string | null;
  mime: string | null;
  size: number | null;

  meta: Record<string, any>;

  finished: boolean;

  createdAt: Date | string;
  updatedAt: Date | string;
  deletedAt: Date | string | null;
}
