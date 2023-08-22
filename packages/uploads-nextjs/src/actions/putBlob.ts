import { CreateUpload201Response } from '@protoxyz/core';
import { UploadOptions, put } from './put';
import { Upload } from '@protoxyz/types';

type UploadWithUrlAndFields = CreateUpload201Response['data'] & {
  fields: Record<string, string>;
  url: string;
};

export async function putBlob(blob: Blob, uploadOptions: UploadOptions) {
  const file = new File([blob], uploadOptions.originalFilename, {
    type: uploadOptions.mime,
    lastModified: Date.now(),
  });

  const putResponse = await put(uploadOptions);

  return upload(file, putResponse.data as UploadWithUrlAndFields);
}

export function upload(
  file: File,
  upload: CreateUpload201Response['data'] & {
    fields: Record<string, string>;
    url: string;
  },
) {
  const formData = new FormData();

  Object.entries({
    ...upload.fields,
    file,
  }).forEach(([key, value]) => {
    formData.append(key, value);
  });

  return fetch(upload.url, {
    method: 'POST',
    body: formData,
  }).then((response) => {
    if (response.ok) {
      return upload;
    }

    throw new Error('Upload failed');
  });
}
