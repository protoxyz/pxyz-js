import Link from 'next/link';
import React from 'react';

interface FooterLinkProps {
  prefix?: string;
  text: string;
  href?: string;
  onClick?: () => void;
}

export function FooterLink({ prefix, text, href, onClick }: FooterLinkProps) {
  return (
    <div className="after:text-muted flex items-center gap-1 after:text-sm [&:not(:last-child)]:after:content-['|']">
      {prefix && (
        <span className="text-muted-foreground text-sm">{prefix}</span>
      )}
      <Link
        href={href ?? '#'}
        onClick={onClick}
        className="text-primary hover:text-muted-foreground-hover text-sm"
      >
        {text}
      </Link>
    </div>
  );
}
