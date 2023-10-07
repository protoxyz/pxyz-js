import { PutProps } from './put';
import { CreateUpload201Response } from '@protoxyz/core';

type UploadProps = PutProps & {
  upload: CreateUpload201Response['data'];
  file: File;
};

export function uploadBlob(
  props: PutProps & {
    upload: CreateUpload201Response['data'];
    blob: Blob;
  },
) {
  const { blob, ...otherProps } = props;

  const file = new File(
    [blob],
    props.upload.originalFilename ?? props.upload.id,
    {
      type: props.upload.mime ?? undefined,
      lastModified: Date.now(),
    },
  );

  return upload({ file, ...otherProps });
}

export function upload(props: UploadProps) {
  const formData = new FormData();

  Object.entries({
    ...props.upload.fields,
    file: props.file,
  }).forEach(([key, value]) => {
    formData.append(key, value as File | string);
  });

  const xhr = new XMLHttpRequest();

  xhr.upload.addEventListener('progress', (e) => {
    props.onProgress?.(props.upload, (e.loaded / e.total) * 100);
  });

  xhr.addEventListener('load', () => {
    props.onFinish?.(props.upload);
  });

  xhr.addEventListener('error', (err) => {
    console.log('Error uploading', err);
    props.onError?.(props.upload, err);
  });

  xhr.addEventListener('abort', () => {
    props.onAbort?.(props.upload);
  });

  xhr.open('POST', props.upload.uploadUrl, true);

  xhr.send(formData);
}
