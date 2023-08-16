import React from 'react';
import { Upload } from '@protoxyz/types';
import { PutProps, put } from '../actions/put';
import { Image } from './image';
import { cn } from '../utils';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Progress } from './ui/progress';

export interface UploaderProps extends PutProps {
  label?: string;
  accept?: string;
  title?: string;
  className?: string;
  previewWidth?: number;
  previewHeight?: number;
}
export function Uploader({
  title = 'Upload a .png or .jpg image (max 5MB).',
  accept = 'image/png, image/jpeg',
  label,
  className,
  previewWidth = 512,
  previewHeight = 512,
  uploadUrl,
  ...handlers
}: UploaderProps) {
  const [progress, setProgress] = React.useState<number | undefined>(undefined);
  const [error, setError] = React.useState<string | undefined>(undefined);
  const [upload, setUpload] = React.useState<Upload | undefined>(undefined);
  const [finished, setFinished] = React.useState<boolean>(false);

  const reset = () => {
    setProgress(undefined);
    setError(undefined);
    setUpload(undefined);
    setFinished(false);
  };

  const onAbort = (upload: Upload) => {
    handlers.onAbort?.(upload);
    reset();
  };

  const onError = (
    upload: Upload,
    err: ProgressEvent<XMLHttpRequestEventTarget>,
  ) => {
    setError(err);
    handlers.onError?.(upload, err);
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
    setFinished(true);
    handlers.onFinish?.(upload);
    reset();
  };

  // if (finished) {
  //   return (
  //     <Image
  //       alt={upload.id}
  //       tenantId={upload.tenantId}
  //       uploadId={upload.id}
  //       width={previewWidth}
  //       height={previewHeight}
  //     />
  //   );
  // }

  if (upload) {
    return (
      <div
        className={cn(
          'bg-slate-50 flex flex-col gap-5 rounded-lg p-5 ',
          className,
        )}
        style={{ width: previewWidth, height: previewHeight }}
      >
        {progress && (
          <div className="text-slate-500 flex flex-col gap-3">
            {upload.originalFilename}...
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
        'bg-slate-50 flex flex-col gap-5 rounded-lg p-5 ',
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
  const file = e.target.files?.[0]!;

  put({
    file,
    ...props,
  });
};
