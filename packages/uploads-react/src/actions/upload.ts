import { PutProps } from './put';

type UploadProps = PutProps & {
  upload: any;
  file: File;
};

export function uploadBlob(
  props: PutProps & {
    upload: any;
    blob: Blob;
  },
) {
  const { blob, ...otherProps } = props;

  const file = new File([blob], props.upload.originalFilename, {
    type: props.upload.mime,
    lastModified: Date.now(),
  });

  return upload({ file, ...otherProps });
}

export function upload(props: UploadProps) {
  const formData = new FormData();

  Object.entries({
    ...props.upload.fields,
    file: props.file,
  }).forEach(([key, value]) => {
    formData.append(key, value as string);
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

  xhr.open('POST', props.uploadUrl, true);

  xhr.send(formData);
}
