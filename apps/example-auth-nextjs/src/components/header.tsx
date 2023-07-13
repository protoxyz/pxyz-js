import {
  IsLoggedIn,
  IsLoggedOut,
  OrganizationSwitcher,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@protoxyz/auth-react';

export const Header = () => {
  return (
    <div className="bg-background fixed top-0 z-40 w-full border-b">
      <div className="flex h-16 items-center px-4">
        <IsLoggedIn>
          <OrganizationSwitcher />
          {/* <MainNav className="mx-6" /> */}
          <div className="ml-auto flex items-center space-x-4">
            {/* <Search /> */}
            <UserButton />
          </div>
        </IsLoggedIn>

        <IsLoggedOut>
          <div className="ml-auto flex items-center space-x-4">
            <SignInButton mode="redirect" button={{ variant: 'outline' }} />
            <SignUpButton mode="redirect" />
          </div>
        </IsLoggedOut>
      </div>
    </div>
  );
};
