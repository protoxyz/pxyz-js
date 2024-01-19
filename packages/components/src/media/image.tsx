import React, { useMemo } from 'react';
import {
  getImageUri,
  ImageProcessorOptions,
  ImageProcessorTransformationOptions,
} from '@protoxyz/media';

import { cn } from '../lib/utils';

type ImageProps = {
  alt?: string;
  tenantId?: string;
  uploadId: string;
  className?: string;
  blurhash?: boolean | string;
  options?: ImageProcessorOptions | ImageProcessorTransformationOptions;
};

export function Image({ alt, className, blurhash, ...props }: ImageProps) {
  const [error, setError] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const [blurLoaded, setBlurLoaded] = React.useState(false);

  const uri = useMemo(
    () =>
      getImageUri({
        tenantId: props.tenantId,
        imageId: props.uploadId,
        options: props.options,
      }),
    [props.tenantId, props.uploadId, props.options],
  );

  const blurUri = useMemo(
    () =>
      typeof blurhash === 'string'
        ? blurhash
        : blurhash === true &&
          getImageUri({
            tenantId: props.tenantId,
            imageId: props.uploadId,
            options: {
              ...props.options,
              format: 'blurhash',
            },
          }),
    [props.tenantId, props.uploadId, props.options, blurhash],
  );

  if (error) {
    return <div className={cn('', className)}>?</div>;
  }

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {blurUri && (
        <img
          alt={alt ?? 'Image'}
          onLoad={() => setBlurLoaded(true)}
          src={blurUri}
          className={cn(
            className,
            'duration-250 z-1 absolute inset-0 inline-block transform object-contain opacity-0 transition-opacity ease-in',
            blurLoaded ? 'opacity-100' : '',
          )}
        />
      )}

      <img
        src={uri}
        {...props}
        className={cn(
          className,
          ' duration-250 transform opacity-0 transition-opacity  ease-in',
          loaded ? ' opacity-100' : '',
        )}
        onError={() => setError(true)}
        onLoad={() => {
          setLoaded(true);
          setError(false);
        }}
      />
    </div>
  );
}
