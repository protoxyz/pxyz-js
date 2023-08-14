import { Transformation } from './transformation';

export interface File {
  id: string;
  tenantId: string;

  path: string;
  description: string | null;
  mime: string;
  size: number;
  width: number;
  height: number;
  duration: number | null;

  transformationId: string | null;
  transformation: Transformation | null;

  meta: any;
  createdAt: Date | string;
  updatedAt: Date | string;
  deletedAt: Date | string | null;
}
