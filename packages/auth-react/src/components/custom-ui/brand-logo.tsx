import { AuthComponentType } from '@protoxyz/themes';
import { useBrandLogo, useBrandName } from '../../hooks/useBrand';
import { useProtocolAuthAppearance } from '../../contexts/protocol-context';

export function BrandLogoWrapper({
  component,
  children,
}: {
  component: AuthComponentType;
  children?: React.ReactNode;
}) {
  const { appearance } = useProtocolAuthAppearance({ component });
  if (appearance.layout?.logoPlacement === 'none') return null;
  return <div className="pxyz-brand-logo-wrapper mb-8">{children}</div>;
}

export function BrandLogo({ component }: { component: AuthComponentType }) {
  const brandLogo = useBrandLogo({ component });
  const brandName = useBrandName({ component });

  if (!brandLogo) return null;
  return (
    <img
      src={brandLogo}
      alt={brandName}
      className="pxyz-auth-brand-logo flex h-6 w-auto flex-grow-0"
    />
  );
}
