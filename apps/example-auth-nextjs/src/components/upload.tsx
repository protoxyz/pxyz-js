'use client';
import { put } from '@protoxyz/uploads-nextjs/client';
import { Upload } from '@protoxy/types';
import { useState } from 'react';

export default function Upload() {
  const [progress, setProgress] = useState<number | undefined>(undefined);
  return (
    <div className="bg-slate-50 flex flex-col gap-5 rounded-lg p-5">
      <p>Upload a .png or .jpg image (max 1MB).</p>
      <input
        onChange={(e) => uploadPhoto(e, setProgress)}
        type="file"
        accept="image/png, image/jpeg"
      />
      {progress && <div>{progress.toFixed(0)}%</div>}
    </div>
  );
}

const uploadPhoto = async (
  e: React.ChangeEvent<HTMLInputElement>,
  setProgress: (progress: number) => void,
) => {
  const file = e.target.files?.[0]!;

  put({
    file,
    onProgress: (upload: Upload, progress: number) => setProgress(progress),
  });
};
