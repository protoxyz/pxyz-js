import React, { useMemo } from 'react';
import {
  OrganizationProfileFlowRoute,
  useProtocolAuthOrganizationProfileFlow,
} from '../../../contexts/flow-context';
import { OrganizationMembersRoute } from './routes/organizationMembers';
import { SidebarNav } from '../../custom-ui/sidebar-nav';
import { AuthComponentType } from '@protoxyz/themes';
import { CardWrapper } from '../../custom-ui/card-wrapper';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../ui/card';
import {
  useProtocolAuth,
  useProtocolAuthAppearance,
} from '../../../contexts/protocol-context';
import { OrganizationSettingsRoute } from './routes/organizationSettings';
import { userDisplayName } from '../../../lib/display';
import { UserButton } from '../user-button';
import { BuildingIcon, CogIcon, UsersIcon } from 'lucide-react';
import { useProtocolAuthOrganizationsList } from '../../../hooks/useOrganizationsList';
import { LoadingButton } from '../../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { ResponseStatus } from '@protoxyz/types';
import { SESSION_COOKIE_NAME, setSessionCookie } from '../../../lib/cookies';

const component: AuthComponentType = 'organizationProfile';

interface UpdateProfileCardOptions {
  onDeleteOrganization?: () => void;
}
export function OrganizationProfile({
  onDeleteOrganization,
}: UpdateProfileCardOptions) {
  const { user, org, orgId } = useProtocolAuth();
  const { appearance } = useProtocolAuthAppearance({ component });
  const { route } = useProtocolAuthOrganizationProfileFlow();

  const nav = useMemo(
    () => [
      {
        label: 'Members',
        icon: <UsersIcon className="h-4 w-4" />,
        orgRoute: OrganizationProfileFlowRoute['organizationProfile:members'],
      },
      {
        label: 'Settings',
        icon: <CogIcon className="h-4 w-4" />,
        orgRoute: OrganizationProfileFlowRoute['organizationProfile:settings'],
      },
    ],
    [route],
  );

  return (
    <CardWrapper
      component={component}
      className={appearance?.elements?.cardWrapper}
    >
      {!orgId && <SelectOrganizationCard />}
      {orgId && (
        <Card className={appearance?.elements?.card}>
          <CardHeader className={appearance?.elements?.cardHeader}>
            <CardTitle className={appearance?.elements?.cardHeaderTitle}>
              {org?.name ?? userDisplayName(user)}
            </CardTitle>
            <CardDescription
              className={appearance?.elements?.cardHeaderDescription}
            >
              Manage your organization settings and members.
            </CardDescription>
          </CardHeader>
          <CardContent className={appearance?.elements?.cardContent}>
            <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-8 lg:space-y-0">
              <aside className="lg:w-1/5">
                <SidebarNav items={nav} />
              </aside>
              <div className=" flex-1  ">
                {route ===
                  OrganizationProfileFlowRoute[
                    'organizationProfile:members'
                  ] && <OrganizationMembersRoute />}
                {route ===
                  OrganizationProfileFlowRoute[
                    'organizationProfile:settings'
                  ] && (
                  <OrganizationSettingsRoute
                    onDeleteOrganization={onDeleteOrganization}
                  />
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </CardWrapper>
  );
}

function SelectOrganizationCard() {
  const { navigate, tokenCache, tenant, protocol, setState } =
    useProtocolAuth();
  const { appearance } = useProtocolAuthAppearance({ component });
  const { organizations } = useProtocolAuthOrganizationsList({});

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
        org: organizations.data.find((org) => org.id === orgId),
        orgId,
      }));

      navigate('/organization');
    }
  }, []);

  return (
    <Card className={appearance?.elements?.card}>
      <CardHeader className={appearance?.elements?.cardHeader}>
        <CardTitle className={appearance?.elements?.cardHeaderTitle}>
          Select Organization
        </CardTitle>
        <CardDescription
          className={appearance?.elements?.cardHeaderDescription}
        >
          Select an organization below to manage your organization settings and
          members.
        </CardDescription>
      </CardHeader>
      <CardContent className={appearance?.elements?.cardContent}>
        <div className="mt-6 flex flex-col gap-2">
          {organizations.data?.map((team) => (
            <LoadingButton
              variant="secondary"
              className="h-24 justify-start"
              size="lg"
              onClick={() => {
                createOrgToken(team.id);
              }}
            >
              <Avatar>
                <AvatarImage src={team.logoUri} alt={team.name} />
                <AvatarFallback>
                  <div className="bg-background  flex items-center justify-center   p-4">
                    <BuildingIcon className="h-4 w-4" />
                  </div>
                </AvatarFallback>
              </Avatar>
              <div className="text-foreground text-xl font-bold">
                {team.name}
              </div>
            </LoadingButton>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
