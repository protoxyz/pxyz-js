import clsx from 'clsx';

interface ContainerProps {
  children?: React.ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={clsx(
        'min-w-screen flex h-full min-h-screen w-full items-center justify-center bg-zinc-50',
        className,
      )}
    >
      {children}
    </div>
  );
}
