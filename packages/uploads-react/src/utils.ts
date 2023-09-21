import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {
  ImageProcessorOptions,
  ImageProcessorTransformationOptions,
} from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImageURI({
  imageId,
  options,
}: {
  imageId: string;
  options: ImageProcessorOptions | ImageProcessorTransformationOptions;
}) {
  const CDN_URL =
    process.env.PXYZ_CDN_URL ??
    process.env.NEXT_PUBLIC_PXYZ_CDN_URL ??
    'https://cdn.pxyz.cloud';

  const src = new URL(`/${imageId}/image?`, CDN_URL);

  if (options) {
    if ('transformation' in options) {
      src.searchParams.append('t', options.transformation);
    } else {
      const { format, width, height, resizeMode, quality, compression } =
        options as ImageProcessorOptions;
      if (width) {
        src.searchParams.append('w', width.toString());
      }
      if (height) {
        src.searchParams.append('h', height.toString());
      }
      if (resizeMode) src.searchParams.append('rm', resizeMode);
      if (quality) src.searchParams.append('q', quality.toString());
      if (compression) src.searchParams.append('c', compression.toString());
      if (format) src.searchParams.append('f', format);
    }
  }

  return src.toString();
}
