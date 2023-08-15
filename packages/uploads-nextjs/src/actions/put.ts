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
  const pkey = publicKey ?? process.env.PXYZ_PUBLIC_KEY;
  const skey = secretKey ?? process.env.PXYZ_SECRET_KEY;

  if (!pkey) {
    throw new Error('Missing publicKey and PXYZ_PUBLIC_KEY');
  }

  if (!skey) {
    throw new Error('Missing secretKey and PXYZ_SECRET_KEY');
  }

  const protocol = new Protocol({
    publicKey: pkey,
    secretKey: skey,
    debug: process.env.NODE_ENV === 'development',
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
