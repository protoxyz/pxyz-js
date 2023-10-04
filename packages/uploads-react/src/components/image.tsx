import React, { useMemo } from 'react';
import { cn, getImageUri } from '../utils';
import {
  ImageProcessorOptions,
  ImageProcessorTransformationOptions,
} from '../types';

type ImageProps = {
  alt?: string;
  uploadId: string;
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
      getImageUri({
        imageId: props.uploadId,
        options: props.options,
      }),
    [props.uploadId, props.options],
  );

  const blurUri = useMemo(
    () =>
      typeof blurhash === 'string'
        ? blurhash
        : blurhash === true &&
          getImageUri({
            imageId: props.uploadId,
            options: {
              ...props.options,
              format: 'blurhash',
            },
          }),
    [props.uploadId, props.options],
  );

  if (error) {
    return <div className={cn('', className)}>?</div>;
  }

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {blurUri && (
        <img
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
        onError={(e) => setError(true)}
        onLoad={() => {
          setLoaded(true);
          setError(false);
        }}
      />
    </div>
  );
}
