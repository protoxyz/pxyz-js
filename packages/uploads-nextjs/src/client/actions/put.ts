import { Upload } from '@protoxyz/types';

export interface PutProps {
  uploadUrl?: string;

  onCreate?: (upload: Upload) => void;
  onProgress?: (upload: Upload, progress: number) => void;
  onFinish?: (upload: Upload) => void;
  onError?: (
    upload: Upload,
    err: ProgressEvent<XMLHttpRequestEventTarget>,
  ) => void;
  onAbort?: (upload: Upload) => void;
}

export async function put({
  file,

  uploadUrl = '/api/upload-url',
  onCreate,
  onProgress,
  onFinish,
  onError,
  onAbort,
}: {
  file: File;
} & PutProps) {
  const originalFilename = file.name;
  const contentType = file.type;
  const contentSize = file.size;

  const res = await fetch(uploadUrl, {
    method: 'POST',
    body: JSON.stringify({
      originalFilename,
      contentType,
      contentSize,
    }),
  });

  const upload = await res.json();

  if (!upload.uploadUrl) {
    console.log(`Error getting upload url`);
    return;
  }

  onCreate?.(upload);

  const formData = new FormData();

  Object.entries({
    ...upload.fields,
    file,
  }).forEach(([key, value]) => {
    formData.append(key, value as string);
  });

  const xhr = new XMLHttpRequest();

  xhr.upload.addEventListener('progress', (e) => {
    onProgress?.(upload, (e.loaded / e.total) * 100);
  });

  xhr.addEventListener('load', () => {
    onFinish?.(upload);
  });

  xhr.addEventListener('error', (err) => {
    console.log('Error uploading', err);
    onError?.(upload, err);
  });

  xhr.addEventListener('abort', () => {
    onAbort?.(upload);
  });

  xhr.open('POST', upload.uploadUrl, true);

  xhr.send(formData);
}
