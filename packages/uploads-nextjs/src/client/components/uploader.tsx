'use client';
import React from 'react';
import { Upload } from '@protoxyz/types';
import { useState } from 'react';
import { PutProps, put } from '../actions/put';
import { Image } from './image';
import { cn } from '../utils';
import { Label } from './ui/label';
import { Input } from './ui/input';

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
}: UploaderProps) {
  const [progress, setProgress] = useState<number | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [upload, setUpload] = useState<Upload | undefined>(undefined);
  const [finished, setFinished] = useState<boolean>(false);

  const onError = (
    upload: Upload,
    err: ProgressEvent<XMLHttpRequestEventTarget>,
  ) => {
    setError(err);
  };

  const onProgress = (upload: Upload, progress: number) => {
    setProgress(progress);
  };

  const onCreate = (upload: Upload) => {
    setUpload(upload);
  };

  const onFinish = () => {
    setFinished(true);
  };

  if (finished) {
    return (
      <Image
        alt={upload.id}
        tenantId={upload.tenantId}
        uploadId={upload.id}
        width={previewWidth}
        height={previewHeight}
      />
    );
  }

  if (upload) {
    return (
      <div
        className={cn(
          'bg-slate-50 flex flex-col gap-5 rounded-lg p-5 ',
          className,
        )}
        style={{ width: previewWidth, height: previewHeight }}
      >
        {progress && <div>{progress.toFixed(0)}%</div>}
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
            uploadPhoto(e, { onProgress, onCreate, onFinish, onError })
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
