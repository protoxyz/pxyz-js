import {
  IsLoggedIn,
  IsLoggedOut,
  OrganizationSwitcher,
  UserButton,
} from '@protoxyz/auth-react';
import { ThemeToggle } from './theme-toggle';
import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';

export const Header = () => {
  return (
    <div className="bg-background border-muted fixed top-0 z-40 w-full border-b">
      <div className="flex h-16 items-center gap-8 px-4">
        <Link href="/">
          <Image
            src="/protocol-black@4x.png"
            alt="Protocol Logo"
            className="h-8 w-auto dark:invert"
            width={1152}
            height={224}
            priority
          />
        </Link>

        <IsLoggedIn>
          <OrganizationSwitcher />
          {/* <MainNav className="mx-6" /> */}
          <nav>
            <ul className="flex items-center space-x-4">
              <li>
                <Link
                  href="/dashboard"
                  className="text-muted-foreground hover:text-primary text-sm font-semibold"
                >
                  Dashboard
                </Link>
              </li>

              <li>
                <Link
                  href="/organization"
                  className="text-muted-foreground hover:text-primary text-sm font-semibold"
                >
                  Organization Profile
                </Link>
              </li>

              <li>
                <Link
                  href="/user"
                  className="text-muted-foreground hover:text-primary text-sm font-semibold"
                >
                  User Profile
                </Link>
              </li>
            </ul>
          </nav>
          <div className="ml-auto flex items-center space-x-4">
            {/* <Search /> */}
            <ThemeToggle />
            <UserButton />
          </div>
        </IsLoggedIn>

        <IsLoggedOut>
          <div className="ml-auto flex items-center space-x-4">
            <Link href="/sign-in">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link href="/sign-up">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </IsLoggedOut>
      </div>
    </div>
  );
};
