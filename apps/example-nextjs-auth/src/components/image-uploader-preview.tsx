'use client';

import { Upload } from '@protoxyz/types';
import { Image, Uploader } from '@protoxyz/components';
import { useState } from 'react';

export function ImageUploaderPreview() {
  const [upload, setUpload] = useState<Upload | null>(null);
  return (
    <div className="bg-background border-muted-foreground rounded-xl border p-5">
      <h1 className="text-2xl font-bold">Upload Example</h1>
      <Uploader onFinish={(upload) => setUpload(upload)} />
      {upload && (
        <Image
          uploadId={upload.id}
          options={{ height: 512, format: 'webp' }}
          alt="Image preview"
          className=" max-h-[512px] w-auto rounded-xl bg-gray-50"
        />
      )}

      <pre>{JSON.stringify(upload, null, 2)}</pre>
    </div>
  );
}
