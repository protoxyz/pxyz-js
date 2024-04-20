import Link from 'next/link';
import { Button } from '../ui/button';
import { ChevronsUpDownIcon, PlusIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { auth, getOrganizations } from '@protoxyz/auth';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import OrganizationCreateForm from './organization-create-form';
import { OrganizationIcon } from './organization-icon';

export default async function OrganizationButton({}: {}) {
  const session = await auth();

  if (!session) {
    return <div />;
  }

  const organizations = await getOrganizations();
  const currentOrg = organizations?.data?.find(
    (org) => org.id === session.claims?.orgId,
  );

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="max-w-64 w-full ">
            {currentOrg && <Button variant="outline">{currentOrg.name}</Button>}
            {!currentOrg && (
              <Button
                variant="outline"
                className="text-muted-foreground w-full justify-between gap-1"
              >
                <OrganizationIcon iconUri={null} name="Organization" />
                Select an organization
                <ChevronsUpDownIcon className="text-muted-foreground h-4 w-4" />
              </Button>
            )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[400px]" align="end">
          {currentOrg && (
            <>
              <CurrentOrgDisplay
                name={currentOrg.name}
                iconUri={currentOrg.iconUri}
              />
              <DropdownMenuSeparator />
            </>
          )}

          {organizations?.data?.length === 0 && (
            <DropdownMenuLabel>
              <div className="text-muted-foreground py-4 text-center font-light">
                You have no organizations yet.
              </div>
            </DropdownMenuLabel>
          )}

          {organizations?.data?.map((organization) => {
            return (
              <DropdownMenuItem key={organization.id}>
                <Link
                  href={`/organizations/${organization.id}`}
                  className="w-full"
                >
                  <Button variant="link" className="gap-2">
                    <OrganizationIcon
                      iconUri={organization.iconUri}
                      name={organization.name}
                    />
                    <div>
                      {organization.name}
                      <div>{organization.membership?.role?.name}</div>
                    </div>
                  </Button>
                </Link>
              </DropdownMenuItem>
            );
          })}

          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuLabel>
              <Button
                type="button"
                variant="ghost"
                className="flex w-full justify-start gap-2"
              >
                <div className="bg-accent text-muted-foreground flex h-8 w-8 items-center justify-center rounded">
                  <PlusIcon className="h-3 w-3 " />
                </div>
                Create Organization
              </Button>
            </DropdownMenuLabel>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Organization</DialogTitle>
        </DialogHeader>
        <OrganizationCreateForm />
      </DialogContent>
    </Dialog>
  );
}

function CurrentOrgDisplay({
  name,
  iconUri,
}: {
  name: string;
  iconUri: string | null | undefined;
}) {
  return (
    <DropdownMenuLabel>
      <Link
        href="/account/profile"
        className="flex items-center justify-between"
      >
        <OrganizationIcon iconUri={iconUri} name={name} />
        {name}
      </Link>
    </DropdownMenuLabel>
  );
}
