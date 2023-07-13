import { UserDropdown } from '@/components/UserDropdown';
import Image from 'next/image';
import { useProtocolAuth } from '@/providers/protocol';
import Link from 'next/link';
import { useMemo } from 'react';
import clsx from 'clsx';

export function UserHeader() {
  const { theme, instance } = useProtocolAuth();
  const navClasses = useMemo(() => {
    return clsx(theme?.headerBgColor, theme?.headerBoxShadow);
  }, []);

  const brandElement = useMemo(() => {
    if (theme?.brandLogo) {
      return (
        <Image
          className={clsx(
            'hidden h-8 w-auto lg:block',
            theme?.headerBrandLogoFill,
          )}
          src={theme?.brandLogo}
          alt={theme?.brandName ?? ''}
        />
      );
    } else {
      return (
        <h1 className={clsx('text-2xl font-bold', theme?.headerBrandNameColor)}>
          {theme?.brandName}
        </h1>
      );
    }
  }, [instance, theme]);

  return (
    <nav className={navClasses}>
      <div className="mx-auto max-w-7xl px-4 sm:px-4 lg:px-6 xl:px-0">
        <div className="relative flex h-16 justify-between">
          <div className="flex flex-1 items-center  sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <Link href="/">{brandElement}</Link>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <UserDropdown />
          </div>
        </div>
      </div>
    </nav>
  );
}
