import { useMemo } from 'react';
import { useBrandName, useProtocolAuthAppearance } from '@protoxyz/auth-react';
import { AuthComponentType } from '@protoxyz/themes';
import React from 'react';

function FooterLink({ text, href }: { text: string; href: string }) {
  return (
    <a
      target="_blank"
      rel="noreferrer"
      href={href}
      className="pxyz-auth-footer-link"
    >
      {text}
    </a>
  );
}

export function CardFooterLinks({
  component,
}: {
  component: AuthComponentType;
}) {
  const brandName = useBrandName({ component });
  const { appearance } = useProtocolAuthAppearance({ component });

  const footerLinks = useMemo(() => {
    const links: React.ReactNode[] = [];

    if (appearance?.layout?.helpUrl) {
      links.push(
        <FooterLink
          key="Help"
          text="Help"
          href={appearance?.layout?.helpUrl}
        />,
      );
    }

    if (appearance?.layout?.privacyPolicyUrl) {
      links.push(
        <FooterLink
          key="Privacy"
          text="Privacy"
          href={appearance?.layout?.privacyPolicyUrl}
        />,
      );
    }

    if (appearance?.layout?.tosUrl) {
      links.push(
        <FooterLink
          key="Terms"
          text="Terms"
          href={appearance?.layout?.tosUrl}
        />,
      );
    }

    return links;
  }, [
    appearance?.layout?.helpUrl,
    appearance?.layout?.privacyPolicyUrl,
    appearance?.layout?.tosUrl,
  ]);

  if (
    !footerLinks.length ||
    appearance?.layout?.showCopyrightAndTerms === false
  )
    return null;

  return (
    <div className="pxyz-auth-card-footer-links flex justify-between px-2 py-5 text-xs">
      <div className="pxyz-auth-footer-copyright text-muted-foreground">
        &copy; {new Date().getFullYear()} {brandName}
      </div>
      <div className="pxyz-auth-footer-links text-muted-foreground flex items-center gap-3">
        {footerLinks}
      </div>
    </div>
  );
}
