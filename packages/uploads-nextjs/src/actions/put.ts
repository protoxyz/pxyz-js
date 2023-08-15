import { Protocol } from '@protoxyz/core';

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

export async function put({
  path,
  access = 'private',
  originalFilename,
  mime,
  size,
  meta,
  publicKey,
  secretKey,
}: UploadOptions) {
  const protocol = new Protocol({
    publicKey: publicKey ?? process.env.PXYZ_PUBLIC_KEY,
    secretKey: secretKey ?? process.env.PXYZ_SECRET_KEY,
  });

  return protocol.uploads.uploads.create({
    body: {
      path,
      access,
      originalFilename,
      mime,
      size,
      meta,
    },
  });
}
