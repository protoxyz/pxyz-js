import { Input } from './ui/input';
import { Label } from './ui/label';
import React from 'react';

export function FileUpload({
  id = 'file',
  accept = 'text/plain',
  label = 'Select File',
}: {
  id?: string;
  accept?: string;
  label?: string;
}) {
  const handleSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]!;
    const filename = encodeURIComponent(file.name);
    const fileType = encodeURIComponent(file.type);
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type="file"
        accept={accept}
        multiple={false}
        onChange={handleSelected}
      />
    </div>
  );
}
