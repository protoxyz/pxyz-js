export {};
// import { CreateUpload201Response } from '@protoxyz/api-clients';
// import { UploadOptions, put } from './put';

// export async function putBlob(blob: Blob, uploadOptions: UploadOptions) {
//   const putResponse = await put(uploadOptions);

//   return upload(blob, putResponse.data);
// }

// export function upload(
//   blob: Blob,
//   upload: CreateUpload201Response['data'] & {
//     fields: Record<string, string>;
//     url: string;
//   },
// ) {
//   const formData = new FormData();

//   formData.set('file', blob, blob.name);

//   Object.entries({
//     ...upload.fields,
//   }).forEach(([key, value]) => {
//     formData.append(key, value);
//   });

//   return fetch(upload.url, {
//     method: 'POST',
//     body: formData,
//   }).then((response) => {
//     if (response.ok) {
//       return upload;
//     }

//     throw new Error('Upload failed');
//   });
// }
