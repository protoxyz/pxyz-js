import clsx from 'clsx';
import { useProtocolAuth } from '@/providers/protocol';
import { Heading, Subheading } from './Heading';
import { ThemeHeaderAlignment, ThemeHeaderPlacement } from '@protoxyz/themes';

export function Header({
  placement,
  alignment,
  brandLogo,
  brandName,
  subtitle,
}: {
  alignment?: ThemeHeaderAlignment;
  placement?: ThemeHeaderPlacement;
  brandLogo?: string;
  brandName?: string;
  subtitle?: string;
}) {
  const { theme } = useProtocolAuth();
  const logo = brandLogo ?? theme?.brandLogo ?? '';
  const name = brandName ?? theme?.brandName ?? '';

  const alignmentClasses = clsx(
    placement === ThemeHeaderPlacement.outside ? 'px-0' : '',
    alignment === ThemeHeaderAlignment.right ? 'text-right' : '',
    alignment === ThemeHeaderAlignment.center ? 'text-center' : '',
    alignment === ThemeHeaderAlignment.left ? 'text-left' : '',
  );

  return (
    <div
      className={clsx(
        alignmentClasses,
        placement === ThemeHeaderPlacement.inside ? 'mb-10' : '',
      )}
    >
      {!logo && name && <Heading>{name}</Heading>}
      {logo && (
        <img className="inline-block h-8 w-auto" src={logo} alt={name} />
      )}
      <Subheading>{subtitle}</Subheading>
    </div>
  );
}
