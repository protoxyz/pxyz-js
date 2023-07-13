import { Fragment, ReactElement, useMemo } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { useProtocolAuth } from '@/providers/protocol';
import { Avatar } from '@/components/ui/Avatar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export interface UserMenuAdditionalItems {
  label: string;
  href?: string;
  onClick?: () => void;
}

export type UserMenuAdditionalItemsPlacement = 'top' | 'bottom';

export interface UserDropdownProps {
  children?: ReactElement | undefined;
  className?: string | undefined;
  items?: UserMenuAdditionalItems[];
  itemsPlacement?: UserMenuAdditionalItemsPlacement;
  direction?: 'top' | 'bottom';
}
export function UserDropdown({
  children,
  items,
  direction = 'bottom',
  itemsPlacement = 'bottom',
  className = '',
}: UserDropdownProps) {
  const { user, theme, logout } = useProtocolAuth();
  const router = useRouter();

  const primaryEmail = useMemo(() => {
    if (!user) return '';
    return (
      user.emailAddresses?.find((e) => e.id === user.primaryEmailId)?.email ||
      ''
    );
  }, [user]);

  const primaryPhone = useMemo(() => {
    if (!user) return '';
    return (
      user.phoneNumbers?.find((e) => e.id === user.primaryPhoneId)?.phone || ''
    );
  }, [user]);

  const fullName = useMemo(() => {
    if (!user) return '';
    if (user.firstName || user.lastName)
      return [user.firstName, user.lastName].join(' ');
    return user.username ?? 'Unknown';
  }, [user]);

  const additionalItems = useMemo(() => {
    if (!items) return null;
    return items?.map((item) => {
      if (item.href) {
        return (
          <Menu.Item key={item.label}>
            <Link
              className={clsx(
                'block px-4 py-4 text-sm',
                theme?.userDropdownMenuTextColor,
              )}
              href={item.href}
            >
              {item.label}
            </Link>
          </Menu.Item>
        );
      } else {
        return (
          <Menu.Item key={item.label}>
            <button
              onClick={item.onClick}
              className={clsx(
                'block px-4 py-4 text-sm',
                theme?.userDropdownMenuTextColor,
              )}
            >
              {item.label}
            </button>
          </Menu.Item>
        );
      }
    });
  }, [items]);

  if (!user) return null;

  const onLogout = () => {
    logout();
    router.push('/sign-in');
  };

  return (
    <Menu
      as="div"
      className={clsx('relative inline-block text-left', className)}
    >
      <div>
        {
          <Menu.Button
            className={clsx(
              'focus:ring-secondary-500 inline-flex h-10 w-full items-center justify-center  gap-x-2 rounded-md border px-4 text-sm font-medium shadow-sm hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-100 ',
              theme?.userDropdownBorderColor,
              theme?.userDropdownBgColor,
              theme?.userDropdownTextColor,
            )}
          >
            <Avatar src={user?.imageUri} size="xs" className="lg:mr-2" />

            <span>{children || fullName}</span>
            {!children && (
              <ChevronDownIcon
                className="-mr-1 ml-2 h-5 w-5"
                aria-hidden="true"
              />
            )}
          </Menu.Button>
        }
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={clsx(
            direction === 'bottom' ? 'right-0' : 'bottom-0',
            `absolute z-10 mt-2 w-64 origin-bottom-left divide-y rounded-md border  shadow-sm ring-1 ring-black ring-opacity-5 focus:outline-none   `,
            theme?.userDropdownMenuBgColor,
            theme?.userDropdownMenuBorderColor,
            theme?.userDropdownMenuTextColor,
            theme?.userDropdownMenuDividerColor,
            theme?.userDropdownMenuShadow,
          )}
        >
          <div className="flex flex-col items-center justify-center px-5 py-5 text-center">
            <Avatar src={user?.imageUri} size="4xl" className="mb-5" />
            <p className="text-sm font-light text-zinc-400 dark:text-zinc-400">
              Signed in as
            </p>
            <p
              className={clsx(
                'truncate text-sm font-bold',
                theme?.userDropdownMenuTextColor,
              )}
            >
              {primaryEmail || primaryPhone || user.username || 'Unknown'}
            </p>
          </div>
          <div
            className={clsx(
              'divide-y py-1 ',
              theme?.userDropdownMenuDividerColor,
            )}
          >
            {itemsPlacement === 'top' && additionalItems}
            <Menu.Item>
              <Link
                className={clsx(
                  'block px-4 py-4 text-sm',
                  theme?.userDropdownMenuTextColor,
                )}
                href={`/user`}
              >
                Manage Account
              </Link>
            </Menu.Item>
            {itemsPlacement === 'bottom' && additionalItems}
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              <button
                onClick={onLogout}
                type="submit"
                className="bg-primary-500 w-full px-5 py-3 text-white hover:opacity-75"
              >
                Log Out
              </button>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
