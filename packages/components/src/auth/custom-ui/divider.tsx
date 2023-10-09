import React from 'react';
interface DividerProps {
  text?: string;
}

export function Divider({ text = 'or' }: DividerProps) {
  return (
    <div className="pxyz-auth-divider relative">
      <div className="absolute inset-0 flex items-center">
        <span className="pxyz-auth-divider-border border-muted w-full border-t" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="pxyz-auth-divider-text bg-background text-muted-foreground px-2">
          {text}
        </span>
      </div>
    </div>
  );
}
