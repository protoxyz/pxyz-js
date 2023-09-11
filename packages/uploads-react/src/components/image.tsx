import React, { useMemo } from 'react';
import { cn, getImageURI } from '../utils';
import {
  ImageProcessorOptions,
  ImageProcessorTransformationOptions,
} from '../types';

type ImageProps = {
  alt?: string;
  uploadId: string;
  tenantId?: string;
  className?: string;
  blurhash?: boolean | string;
  options?: ImageProcessorOptions | ImageProcessorTransformationOptions;
};

export function Image({ className, blurhash, ...props }: ImageProps) {
  const [error, setError] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const [blurLoaded, setBlurLoaded] = React.useState(false);

  const uri = useMemo(
    () =>
      getImageURI({
        imageId: props.uploadId,
        tenantId: props.tenantId,
        options: props.options,
      }),
    [props.uploadId, props.tenantId, props.options],
  );

  const blurUri = useMemo(
    () =>
      typeof blurhash === 'string'
        ? blurhash
        : blurhash === true &&
          getImageURI({
            imageId: props.uploadId,
            tenantId: props.tenantId,
            options: {
              ...props.options,
              format: 'blurhash',
            },
          }),
    [props.uploadId, props.tenantId, props.options],
  );

  if (error) {
    return <div className={cn('bg-foreground', className)}>?</div>;
  }

  return (
    <div
      className={cn(
        'bg-foreground relative overflow-hidden rounded',
        className,
      )}
    >
      {blurUri && (
        <img
          onLoad={() => setBlurLoaded(true)}
          src={blurUri}
          className={cn(
            'bg-foreground duration-250 z-1 absolute inset-0 inline-block transform object-contain opacity-0 transition-opacity ease-in',
            blurLoaded ? 'opacity-100' : '',
          )}
        />
      )}

      <img
        src={uri}
        {...props}
        className={cn(
          'bg-foreground duration-250 transform opacity-0 transition-opacity  ease-in',
          loaded ? ' opacity-100' : '',
        )}
        onError={(e) => setError(true)}
        onLoad={() => {
          setLoaded(true);
          setError(false);
        }}
      />
    </div>
  );
}
