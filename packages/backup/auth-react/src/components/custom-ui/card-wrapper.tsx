import { AuthComponentType } from '@protoxyz/themes';
import { cn } from '../../lib/utils';
import { ComponentCardWidths } from '../../lib/sizes';

interface CardWrapperProps {
  children: React.ReactNode;
  className?: string;
  component: AuthComponentType;
}
export function CardWrapper({
  children,
  className,
  component,
}: CardWrapperProps) {
  const width = ComponentCardWidths[component];
  return (
    <div
      className={cn(
        'pxyz-auth-card-wrapper mx-auto grid w-full',
        width,
        className,
      )}
    >
      {children}
    </div>
  );
}
