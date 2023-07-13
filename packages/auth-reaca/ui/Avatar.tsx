import clsx from 'clsx';
import { CSSProperties, useMemo } from 'react';

interface AvatarProps {
  src?: string | null | undefined;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
  className?: string;
  style?: CSSProperties;
}

export function Avatar({
  src,
  size = 'md',
  className = '',
  style = {},
}: AvatarProps) {
  const defaultStyle = useMemo(() => {
    switch (size) {
      case 'xs':
        return {
          width: '1.5rem',
          height: '1.5rem',
        };
      case 'sm':
        return {
          width: '2rem',
          height: '2rem',
        };
      case 'md':
        return {
          width: '3rem',
          height: '3rem',
        };
      case 'lg':
        return {
          width: '4rem',
          height: '4rem',
        };
      case 'xl':
        return {
          width: '5rem',
          height: '5rem',
        };
      case '2xl':
        return {
          width: '6rem',
          height: '6rem',
        };
      case '3xl':
        return {
          width: '7rem',
          height: '7rem',
        };
      case '4xl':
        return {
          width: '8rem',

          height: '8rem',
        };
      case '5xl':
        return {
          width: '9rem',
          height: '9rem',
        };

      default:
        return {
          width: '3rem',
          height: '3rem',
        };
    }
  }, [size]);

  return (
    <div
      className={clsx(className, 'bg-zinc-100 dark:bg-zinc-800')}
      style={{
        ...defaultStyle,
        // backgroundColor: "#e2e8f0",
        borderRadius: '50%',
        backgroundImage: `url(${src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        ...style,
      }}
    />
  );
}
