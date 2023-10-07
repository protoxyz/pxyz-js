import {
  ImageProcessorOptions,
  ImageProcessorTransformationOptions,
} from './types';

export function getImageUri({
  imageId,
  options,
}: {
  imageId: string;
  options?: ImageProcessorOptions | ImageProcessorTransformationOptions;
}) {
  const cdnUrl = getCdnUri();

  const src = new URL(`/${imageId}/image?`, cdnUrl);

  if (options) {
    if ('transformation' in options && options.transformation) {
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

export function getCdnUri() {
  return (
    process.env.PXYZ_CDN_URL ??
    process.env.NEXT_PUBLIC_PXYZ_CDN_URL ??
    'https://cdn.pxyz.cloud'
  );
}

export function getVideoUri(videoId: string) {
  const cdnUrl = getCdnUri();

  return new URL(`/${videoId}/video`, cdnUrl).toString();
}
