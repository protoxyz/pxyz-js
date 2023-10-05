import * as React from 'react';
import { Check, ChevronsUpDown, CogIcon, PlusCircle } from 'lucide-react';

import { cn } from '../../../lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Button } from '../../ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '../../ui/command';
import { Dialog, DialogContent, DialogTrigger } from '../../ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import {
  organizationImage,
  organizationInitials,
  userDisplayName,
  userImage,
  userInitials,
} from '../../../lib/display';
import { useProtocolAuthOrganizationsList } from '../../../hooks/useOrganizationsList';
import { OrganizationWithRole, ResponseStatus } from '@protoxyz/types';
import { CreateOrganization } from '../create-organization';
import { useProtocolAuth } from '../../../contexts/protocol-context';
import { OrganizationProfile } from '../organization-profile';
import { SESSION_COOKIE_NAME, setSessionCookie } from '../../../lib/cookies';

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;
type Team = Pick<OrganizationWithRole, 'name' | 'logoUri' | 'id'>;

type Group = {
  label: string;
  teams: Team[];
};

interface OrganizationSwitcherProps extends PopoverTriggerProps {
  className?: string;
  onOrganizationSelect?: (orgId: string | null) => void;
}

export function OrganizationSwitcher({
  className,
  onOrganizationSelect,
}: OrganizationSwitcherProps) {
  const { tokenCache, tenant, user, orgId, protocol, setState } =
    useProtocolAuth();
  // const { appearance } = useProtocolAuthAppearance({ component: "organizationSwitcher" });
  const { organizations } = useProtocolAuthOrganizationsList({});

  const groups: Group[] = [
    {
      label: 'Personal Account',
      teams: [
        {
          name: userDisplayName(user),
          logoUri: userImage(user),
          id: null,
        },
      ],
    },
    {
      label: 'Teams',
      teams: organizations.data,
    },
  ];

  const [open, setOpen] = React.useState(false);
  const [showDialog, setShowDialog] = React.useState<'newTeam' | 'manageTeam'>(
    null,
  );
  const [selectedTeamId, setSelectedTeamId] = React.useState<string>(orgId);

  const createOrgToken = React.useCallback(async (orgId: string | null) => {
    const response = await protocol.auth.sessions.issueToken({
      body: {
        orgId,
      },
    });

    if (response.status === ResponseStatus.Success) {
      setSessionCookie(response.data?.jwt, tenant);
      tokenCache?.saveToken(SESSION_COOKIE_NAME, response.data?.jwt);

      setState((state) => ({
        ...state,
        session: response.data.sessionUser,
        orgId,
      }));
    }
  }, []);

  const selectedTeam =
    organizations?.data?.find((org) => org.id === selectedTeamId) ?? null;

  return (
    <Dialog open={showDialog !== null} onOpenChange={() => setShowDialog(null)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a team"
            className={cn('w-[200px] justify-between truncate', className)}
          >
            <Avatar className="mr-2 h-8 w-8">
              <AvatarImage
                src={
                  selectedTeam
                    ? organizationImage(selectedTeam)
                    : userImage(user)
                }
                alt={selectedTeam ? selectedTeam.name : userDisplayName(user)}
              />
              <AvatarFallback>
                {selectedTeam
                  ? organizationInitials(selectedTeam)
                  : userInitials(user)}
              </AvatarFallback>
            </Avatar>
            {selectedTeam ? selectedTeam.name : userDisplayName(user)}
            <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search team..." />
              <CommandEmpty>No team found.</CommandEmpty>
              {groups?.map((group) => (
                <CommandGroup key={group.label} heading={group.label}>
                  {group.teams?.map((team) => (
                    <CommandItem
                      key={team.name}
                      onSelect={() => {
                        setSelectedTeamId(team.id);
                        setOpen(false);
                        createOrgToken(team.id);
                        onOrganizationSelect?.(team.id);
                        setState((state) => ({
                          ...state,
                          org: organizations.data?.find(
                            (org) => org.id === team.id,
                          ),
                          orgId: team.id,
                        }));
                      }}
                      className="text-sm"
                    >
                      <Avatar className="mr-2 h-8 w-8">
                        <AvatarImage src={team.logoUri} alt={team.name} />
                        <AvatarFallback>
                          {organizationInitials(team)}
                        </AvatarFallback>
                      </Avatar>
                      {team.name}
                      <Check
                        className={cn(
                          'ml-auto h-4 w-4',
                          selectedTeamId === team.id
                            ? 'opacity-100'
                            : 'opacity-0',
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>
            <CommandSeparator />
            <CommandList>
              {orgId && (
                <CommandGroup>
                  <DialogTrigger asChild>
                    <CommandItem
                      onSelect={() => {
                        setOpen(false);
                        setShowDialog('manageTeam');
                      }}
                    >
                      <CogIcon className="mr-2 h-5 w-5" />
                      Manage Team
                    </CommandItem>
                  </DialogTrigger>
                </CommandGroup>
              )}
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false);
                      setShowDialog('newTeam');
                    }}
                  >
                    <PlusCircle className="mr-2 h-5 w-5" />
                    Create Team
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <DialogContent>
        {showDialog === 'newTeam' && (
          <CreateOrganization onCancel={() => setShowDialog(null)} />
        )}
        {showDialog === 'manageTeam' && (
          <OrganizationProfile
            onDeleteOrganization={() => setShowDialog(null)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
