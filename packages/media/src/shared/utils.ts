import {
  ImageProcessorOptions,
  ImageProcessorTransformationOptions,
} from './types';

export function getImageUri({
  tenantId,
  imageId,
  options,
}: {
  tenantId: string;
  imageId: string;
  options?: ImageProcessorOptions | ImageProcessorTransformationOptions;
}) {
  const cdnUrl = getCdnUri();

  const src = new URL(`/${tenantId}/${imageId}/image?`, cdnUrl);

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
    'https://cdn.prod.pxyz.cloud'
  );
}

export function getVideoUri(tenantId: string, videoId: string) {
  const cdnUrl = getCdnUri();

  return new URL(`/${tenantId}/${videoId}/video`, cdnUrl).toString();
}
