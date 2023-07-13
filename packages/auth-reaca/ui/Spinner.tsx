import { Size } from '@protoxyz/themes';
import clsx from 'clsx';
import { useMemo } from 'react';

export interface SpinnerProps {
  size?: Size;
  color?:
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'warning'
    | 'success'
    | 'info'
    | 'light'
    | 'dark'
    | 'white'
    | 'black';
  className?: string;
}

export function Spinner({
  className,
  size = 'md',
  color = 'white',
}: SpinnerProps) {
  const sizeClasses = useMemo(() => {
    switch (size) {
      case 'xs':
        return 'w-4 h-4';
      case 'sm':
        return 'w-5 h-5';
      case 'md':
        return 'w-6 h-6';
      case 'lg':
        return 'w-8 h-8';
      case 'xl':
        return 'w-10 h-10';
      case '2xl':
        return 'w-12 h-12';
      case '3xl':
        return 'w-16 h-16';
      case '4xl':
        return 'w-20 h-20';
      case '5xl':
        return 'w-24 h-24';
      default:
        return 'w-6 h-6';
    }
  }, [size]);

  const colorClasses = useMemo(() => {
    switch (color) {
      case 'primary':
        return 'text-primary-600';
      case 'secondary':
        return 'text-secondary-600';
      case 'danger':
        return 'text-danger-600';
      case 'warning':
        return 'text-warning-600';
      case 'success':
        return 'text-success-600';
      case 'info':
        return 'text-info-600';
      case 'light':
        return 'text-zinc-100';
      case 'dark':
        return 'text-zinc-900';
      case 'white':
        return 'text-white';
      case 'black':
        return 'text-black';
      default:
        return 'text-primary-600';
    }
  }, [color]);

  return (
    <svg
      className={clsx(colorClasses, sizeClasses, className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
        opacity=".25"
      />
      <path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z">
        <animateTransform
          attributeName="transform"
          type="rotate"
          dur="0.75s"
          values="0 12 12;360 12 12"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
}
