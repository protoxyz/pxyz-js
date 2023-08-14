import { Protocol } from '@protoxyz/core';
import { UploadOptions } from '../../types';

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
