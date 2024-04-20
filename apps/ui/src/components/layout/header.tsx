import UserButton from '../auth/user-button';

import OrganizationButton from '../auth/organization-button';

export default function Header() {
  return (
    <header className="bg-background fixed inset-x-0 top-0 flex items-center justify-between p-2">
      <OrganizationButton />

      <UserButton />
    </header>
  );
}
