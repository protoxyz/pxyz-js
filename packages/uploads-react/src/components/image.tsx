import React from 'react';
import { ResizeMode } from '@protoxyz/types';
import { cn } from '../utils';

export type ImageProps = ImageOptionsProps | PredefinedTransformationImageProps;

type DefaultImageProps = {
  alt: string;
  uploadId: string;
  tenantId: string;
  className?: string;
};

type ImageOptionsProps = DefaultImageProps & {
  format?: string;
  width?: number;
  height?: number;
  resizeMode?: ResizeMode;
  quality?: number;
  compression?: number;
};

type PredefinedTransformationImageProps = DefaultImageProps & {
  transformation: string;
};

export function Image({ className, ...props }: ImageProps) {
  const [error, setError] = React.useState(false);

  const CDN_URL =
    process.env.PXYZ_CDN_URL ??
    process.env.NEXT_PUBLIC_PXYZ_CDN_URL ??
    'https://cdn.pxyz.cloud';

  const src = new URL(`/${props.tenantId}/${props.uploadId}/image?`, CDN_URL);

  if ('transformation' in props) {
    src.searchParams.append('transformation', props.transformation);
  } else {
    const { format, width, height, resizeMode, quality, compression } =
      props as ImageOptionsProps;
    if (width) src.searchParams.append('width', width.toString());
    if (height) src.searchParams.append('height', height.toString());
    if (resizeMode) src.searchParams.append('resizeMode', resizeMode);
    if (quality) src.searchParams.append('quality', quality.toString());
    if (compression)
      src.searchParams.append('compression', compression.toString());
    if (format) src.searchParams.append('format', format);
  }

  if (error) {
    return <div className={cn(className, 'bg-slate-50')} {...props} />;
  }

  return (
    <img
      src={src.toString()}
      {...props}
      className={cn(className, 'bg-slate-50')}
      onError={(err) => setError(err)}
    />
  );
}
