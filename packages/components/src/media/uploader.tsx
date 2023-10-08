import React from 'react';
import { Upload } from '@protoxyz/types';
import { PutProps, put } from '@protoxyz/media/client';
import { cn } from '../utils';
import { Progress } from '../ui/progress';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

export interface UploaderProps extends PutProps {
  label?: string;
  accept?: string;
  title?: string;
  className?: string;
}
export function Uploader({
  title = 'Upload a .png or .jpg image (max 5MB).',
  accept = 'image/png, image/jpeg',
  label,
  className,
  uploadUrl,
  ...handlers
}: UploaderProps) {
  const [progress, setProgress] = React.useState<number | undefined>(undefined);
  const [error, setError] = React.useState<string | undefined>(undefined);
  const [upload, setUpload] = React.useState<Upload | undefined>(undefined);

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
    handlers.onFinish?.(upload);
    reset();
  };

  if (upload) {
    return (
      <div
        className={cn(
          'bg-background flex flex-col gap-5 rounded-lg p-5 ',
          className,
        )}
      >
        {progress && (
          <div className="text-muted-foreground flex flex-col gap-3">
            Uploading...
            <Progress value={progress} />
          </div>
        )}
        {error && <div>{error}</div>}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'bg-background flex flex-col gap-5 rounded-lg p-5 ',
        className,
      )}
    >
      <p>{title}</p>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="file">{label}</Label>
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
          id="file"
          type="file"
          accept={accept}
        />
      </div>

      {error && <div>{error}</div>}
    </div>
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
