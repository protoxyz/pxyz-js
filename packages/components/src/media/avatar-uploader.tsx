import React from 'react';
import { Upload } from '@protoxyz/types';
import { PutProps, put } from '@protoxyz/media/client';

import { cn } from '../lib/utils';
import { getImageUri } from '@protoxyz/media';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Input } from '../ui/input';

export interface AvatarUploaderProps extends PutProps {
  avatarId?: string;
  initials?: string;
  accept?: string;
  width?: number;
  height?: number;
  className?: string;
  errorClassName?: string;
  alt?: string;
}
export function AvatarUploader({
  avatarId,
  initials,
  accept = 'image/png, image/jpeg',
  width = 256,
  height = 256,
  alt,
  className,
  errorClassName,
  uploadUrl,
  ...handlers
}: AvatarUploaderProps) {
  const ref = React.useRef<HTMLInputElement>(null);
  const [progress, setProgress] = React.useState<number | undefined>(undefined);
  const [error, setError] = React.useState<string | undefined>(undefined);
  const [upload, setUpload] = React.useState<Upload | undefined>(undefined);
  const [imageId, setImageId] = React.useState<string | undefined>(avatarId);

  const existingAvatarImageUri = React.useMemo(
    () =>
      imageId &&
      getImageUri({
        imageId,
        options: {
          format: 'webp',
          width,
          height,
        },
      }),
    [imageId, width, height],
  );

  const reset = () => {
    setProgress(undefined);
    setError(undefined);
    setUpload(undefined);
  };

  const onAbort = (upload: Upload) => {
    handlers.onAbort?.(upload);
    reset();
  };

  const onError = (
    upload: Upload,
    ev: ProgressEvent<XMLHttpRequestEventTarget>,
  ) => {
    setError('Error uploading file. Please try again.');
    handlers.onError?.(upload, ev);
  };

  const onProgress = (upload: Upload, progress: number) => {
    setProgress(progress);
    handlers.onProgress?.(upload, progress);
  };

  const onCreate = (upload: Upload) => {
    setUpload(upload);
    handlers.onCreate?.(upload);
  };

  const onFinish = (upload: Upload) => {
    setImageId(upload.id);
    handlers.onFinish?.(upload);
    reset();
  };

  const handleClick = () => {
    ref.current?.click();
  };

  return (
    <Avatar
      onClick={handleClick}
      className={cn('h-24 w-24 cursor-pointer', className)}
    >
      <AvatarImage src={existingAvatarImageUri} alt={alt} />
      <AvatarFallback>
        {upload ? (progress ? progress.toFixed(0) : 0) : initials}
      </AvatarFallback>

      {error && <div className={cn('', errorClassName)}>{error}</div>}

      <Input
        onChange={(e) =>
          uploadPhoto(e, {
            uploadUrl,
            onProgress,
            onCreate,
            onFinish,
            onError,
            onAbort,
          })
        }
        className="hidden"
        id="file"
        type="file"
        ref={ref}
        accept={accept}
      />
    </Avatar>
  );
}

const uploadPhoto = async (
  e: React.ChangeEvent<HTMLInputElement>,
  props?: PutProps,
) => {
  const file = e.target.files?.[0];

  if (!file) {
    return;
  }

  put({
    file,
    ...props,
  });
};
