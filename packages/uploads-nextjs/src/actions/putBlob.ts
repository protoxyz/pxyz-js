import { UploadOptions, put } from './put';

type UploadProps = UploadOptions & {
  upload: any;
  file: File;
};

export function putBlob(
  props: UploadOptions & {
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

  return fetch(props.upload.url, {
    method: 'POST',
    body: formData,
  }).then((response) => {
    if (response.ok) {
      return props.upload;
    }

    throw new Error('Upload failed');
  });
}
