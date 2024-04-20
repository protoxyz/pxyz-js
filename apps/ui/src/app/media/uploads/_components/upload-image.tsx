'use client';

import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

export default function ImageUploader() {
  const [file, setFile] = useState<File>();
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      const image = new Image();
      image.onload = () => {
        setDimensions({
          width: image.width,
          height: image.height,
        });
      };
      image.src = e.target.result as string;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <input type="file" onChange={handleChange} />

      {file && (
        <Dialog open={!!file} on={() => setFile(undefined)}>
          <DialogContent>
            <img src={URL.createObjectURL(file)} />
            <div>
              {dimensions.width}x{dimensions.height}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
