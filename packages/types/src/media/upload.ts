export interface Upload {
  id: string;

  tenantId: string;
  path: string;
  folder: string | null;
  originalFilename: string | null;
  mime: string | null;
  size: number | null;
  width: number | null;
  height: number | null;
  duration: number | null;

  meta: Record<string, any>;

  finished: boolean;

  createdAt: Date | string;
  updatedAt: Date | string;
  deletedAt: Date | string | null;
}
