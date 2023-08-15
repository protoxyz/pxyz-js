export interface UploadOptions {
  path: string;
  access?: 'public' | 'private';
  originalFilename: string;
  mime: string;
  size: number;
  meta?: Record<string, any>;
  publicKey?: string;
  secretKey?: string;
}
