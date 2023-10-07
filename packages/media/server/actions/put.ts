import { CreateUpload201Response, ProtocolBackendClient } from '@protoxyz/core';

export interface ServerUploadOptions {
  path: string;
  access?: 'public' | 'private';
  originalFilename: string;
  duration?: number;
  mime: string;
  size: number;
  meta?: Record<string, any>;
  publicKey?: string;
  secretKey?: string;
  tenantId?: string;
}

export async function put({
  path,
  access = 'private',
  originalFilename,
  mime,
  size,
  meta,
  duration,
  publicKey,
  secretKey,
  tenantId,
}: ServerUploadOptions): Promise<CreateUpload201Response> {
  const pkey = publicKey ?? process.env.PXYZ_PUBLIC_KEY;
  const skey = secretKey ?? process.env.PXYZ_SECRET_KEY;
  const tId =
    tenantId ??
    process.env.PXYZ_TENANT_ID ??
    process.env.NEXT_PUBLIC_PXYZ_TENANT_ID;

  if (!pkey) {
    throw new Error(
      'Missing publicKey. Please provide a publicKey or set PXYZ_PUBLIC_KEY or NEXT_PUBLIC_PXYZ_PUBLIC_KEY',
    );
  }

  if (!skey) {
    throw new Error(
      'Missing secretKey. Please provide a secretKey or set PXYZ_SECRET_KEY or NEXT_PUBLIC_PXYZ_SECRET_KEY',
    );
  }

  if (!tId) {
    throw new Error(
      'Missing tenantId. Please provide a tenantId or set PXYZ_TENANT_ID or NEXT_PUBLIC_PXYZ_TENANT_ID',
    );
  }

  const protocol = new ProtocolBackendClient({
    publicKey: pkey,
    secretKey: skey,
    debug: process.env.NODE_ENV === 'development',
  });

  return protocol.media.uploads.create({
    body: {
      path,
      access,
      originalFilename,
      mime,
      size,
      meta,
      duration,
      tenantId: tId,
    },
  });
}
