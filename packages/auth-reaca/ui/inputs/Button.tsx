import clsx from 'clsx';
import Link from 'next/link';
import { Spinner } from '@/components/ui/Spinner';
import { ArrowLongRightIcon } from '@heroicons/react/24/solid';
import { useProtocolAuth } from '@/providers/protocol';

export interface ButtonProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  href?: string;
  onClick?: () => void;
  loading?: boolean;
  full?: boolean;
  type?: 'button' | 'submit' | 'reset';
  arrow?: boolean;
}

export function PrimaryButton(props: ButtonProps) {
  const { className, ...otherProps } = props;
  const { theme } = useProtocolAuth();

  return (
    <Button
      {...otherProps}
      className={clsx(
        className,
        theme?.primaryButtonFontSize,
        theme?.primaryButtonFontWeight,
        theme?.primaryButtonBgColor,
        theme?.primaryButtonTextColor,
        theme?.primaryButtonBorderColor,
        theme?.primaryButtonBorder,
        theme?.primaryButtonBorderRadius,
        theme?.primaryButtonBoxShadow,
        theme?.primaryButtonPaddingHorizontal,
        theme?.primaryButtonPaddingVertical,
      )}
    />
  );
}

export function SecondaryButton(props: ButtonProps) {
  const { className, ...otherProps } = props;
  const { theme } = useProtocolAuth();
  return (
    <Button
      {...otherProps}
      className={clsx(
        className,
        theme?.secondaryButtonFontSize,
        theme?.secondaryButtonFontWeight,
        theme?.secondaryButtonBgColor,
        theme?.secondaryButtonTextColor,
        theme?.secondaryButtonBorderColor,
        theme?.secondaryButtonBorder,
        theme?.secondaryButtonBorderRadius,
        theme?.secondaryButtonBoxShadow,
        theme?.secondaryButtonPaddingHorizontal,
        theme?.secondaryButtonPaddingVertical,
      )}
    />
  );
}

export function Button({
  children,
  full,
  href,
  arrow,
  type = 'button',
  onClick,
  style,
  className,
  loading,
}: ButtonProps) {
  const classes = clsx(
    className,
    full ? 'w-full' : 'w-auto',
    'flex items-center justify-center',
  );

  if (href) {
    return (
      <Link href={href} className={classes} style={style}>
        {!loading && children}
        {loading && <Spinner size="md" />}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={loading ? undefined : onClick}
      className={classes}
      style={style}
    >
      {!loading && children}
      {loading && <Spinner size="md" />}
      {arrow && <ArrowLongRightIcon className="ml-2 h-4 w-4" />}
    </button>
  );
}
