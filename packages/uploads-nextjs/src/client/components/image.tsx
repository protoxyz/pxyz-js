import { ResizeMode } from '@protoxyz/types';
import NextImage, { ImageProps as NextImageProps } from 'next/image';
import { URLSearchParams } from 'url';

export type ImageProps = DefaultImageProps &
  ImageTransformationProps &
  ImageOptions;

export interface DefaultImageProps {
  uploadId: string;
  tenantId: string;
  className: string;
}

export interface ImageTransformationProps {
  transformation: string;
}

export interface ImageOptions {
  format?: string;
  width?: number;
  height?: number;
  resizeMode?: ResizeMode;
  quality?: number;
  compression?: number;
}

export function Image({
  tenantId,
  uploadId,
  transformation,
  format,
  width,
  height,
  resizeMode,
  quality,
  compression,
  ...props
}: ImageProps & NextImageProps) {
  const CDN_URL =
    process.env.PXYZ_CDN_URL ??
    process.env.NEXT_PUBLIC_PXYZ_CDN_URL ??
    'https://cdn.pxyz.cloud';

  const src = new URL(`/${tenantId}/${uploadId}/raw?`, CDN_URL);

  if (transformation) {
    src.searchParams.append('transformation', transformation);
  } else {
    if (width) src.searchParams.append('width', width.toString());
    if (height) src.searchParams.append('height', height.toString());
    if (resizeMode) src.searchParams.append('resizeMode', resizeMode);
    if (quality) src.searchParams.append('quality', quality.toString());
    if (compression)
      src.searchParams.append('compression', compression.toString());
  }

  return <NextImage src={src.toString()} {...props} />;
}
