import React from 'react';

interface SectionHeaderOptions {
  title: string;
  description?: string;
}
export function SectionHeader({ title, description }: SectionHeaderOptions) {
  return (
    <div className="border-muted border-b pb-3">
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
}
