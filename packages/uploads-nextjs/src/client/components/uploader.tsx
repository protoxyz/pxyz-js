'use client';
import { Upload } from '@protoxyz/types';
import { useState } from 'react';
import { PutProps, put } from '../actions/put';

export interface UploaderProps extends PutProps {
  accept?: string;
  title?: string;
}
export function Uploader({
  title = 'Upload a .png or .jpg image (max 5MB).',
  accept = 'image/png, image/jpeg',
}: UploaderProps) {
  const [progress, setProgress] = useState<number | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  const onError = (
    upload: Upload,
    err: ProgressEvent<XMLHttpRequestEventTarget>,
  ) => {
    setError(err);
  };

  const onProgress = (upload: Upload, progress: number) => {
    setProgress(progress);
  };

  return (
    <div className="bg-slate-50 flex flex-col gap-5 rounded-lg p-5">
      <p>{title}</p>
      <input
        onChange={(e) => uploadPhoto(e, { onProgress, onError })}
        type="file"
        accept={accept}
      />
      {progress && <div>{progress.toFixed(0)}%</div>}
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
