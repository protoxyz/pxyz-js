import { AuthComponentType } from '@protoxyz/themes';
import { useBrandLogo, useBrandName } from '../../hooks/useBrand';

export function BrandLogoWrapper({ children }: { children?: React.ReactNode }) {
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
